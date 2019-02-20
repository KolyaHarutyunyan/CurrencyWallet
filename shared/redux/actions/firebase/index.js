import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/messaging'
import 'firebase/database'
import { config } from './config/firebase'

import actions from 'redux/actions'
import { getState } from 'redux/core'
import reducers from 'redux/core/reducers'
import { request } from 'helpers'
import moment from 'moment/moment'

import clientConfig from './config/firebase-client-config'

import appConfig from 'app-config'


const isWidgetBuild = appConfig && appConfig.isWidget

const authorisation = () =>
  new Promise((resolve) =>
    firebase.auth().signInAnonymously()
      .then(() => firebase.auth().onAuthStateChanged((user) => resolve(user)))
      .catch((error) => console.log(`Can't sign in: `, error))
  )

const getIPInfo = () =>
  new Promise(async (resolve) => {
    const ipResponse = await request.get('http://ip-to-geolocation.com/api/json')

    const resultData = {
      ip: ipResponse.query,
      locale: ipResponse.countryCode === 'NO' ? 'EN' : ipResponse.countryCode,
    }
    resolve(resultData)
  })

const sendData = (userId, dataBasePath, data, isDefault = true) =>
  new Promise(async (resolve) => {
    const database = isDefault
      ? firebase.database()
      : firebase.database(window.clientDBinstance)

    const usersRef = database.ref(dataBasePath)

    usersRef.child(userId).set(data)
      .then(() => resolve(true))
      .catch((error) => {
        console.log('Send error: ', error)
        resolve(false)
      })
  })

const askPermission = () =>
  new Promise(async (resolve) => {
    const messaging = firebase.messaging()

    await messaging.requestPermission()
      .then(() => messaging.getToken())
      .then((token) => resolve(token))
      .catch((error) => {
        console.log(error)
        resolve(false)
      })
  })

const initialize = () => {
  // window.clientDBinstance = firebase.initializeApp(clientConfig, 'widget-client')

  window.firebaseDefaultInstance = firebase.initializeApp(config)

  if (isSupported()) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => firebase.messaging().useServiceWorker(registration))

    const messaging = firebase.messaging()

    messaging.onMessage((payload) => {
      console.log('Message received. ', payload)
      const message = payload.notification.body
      actions.notifications.show('Message', { message })
    })
  }
}

const getUserID = () =>
  new Promise(async resolve => {
    const storageName = 'firebaseUserId'
    let userID = localStorage.getItem(storageName)
    let user = {}

    if (userID === null) {
      user = await authorisation()
      userID = user.uid
      localStorage.setItem(storageName, userID)
    }
    resolve(userID)
  })

const submitUserData = (dataBasePath = 'usersCommon', data = {}) =>
  new Promise(async resolve => {
    const userID = await getUserID()
    const date = moment().format('DD-MM-YYYY')
    const gaID = actions.analytics.getClientId() || 'None'

    if (userID) {
      const sendResult = await sendData(userID, dataBasePath, {
        date,
        gaID,
        ...data,
      })
      resolve(sendResult)
    }
  })

const submitUserDataWidget = async (dataBasePath = 'usersCommon') => {
  if (!isWidgetBuild) {
    return
  }
  const { user: { ethData: { address: ethAddress }, btcData: { address: btcAddress } } } = getState()

  return new Promise(async resolve => {
    const userID = await getUserID()
    const data = {
      ethAddress,
      btcAddress,
    }

    if (userID) {
      const sendWidgetResultToDefaultDB = await sendData(userID, `widgetUsers/${window.top.location.host}/${dataBasePath}`, data)
      // const sendResult = await sendData(userID, dataBasePath, data, false) // send to client's firebase

      resolve(sendWidgetResultToDefaultDB)
    }
  })
}

const signUpWithPush = (data) =>
  new Promise(async resolve => {
    const dataBasePath = 'usersSubscribed/pushNotification'
    const messagingToken = await askPermission()

    if (!messagingToken) {
      resolve(messagingToken)
      return
    }

    console.log('firebase messagingToken: ', messagingToken)

    const sendResult = submitUserData(dataBasePath, {
      ...data,
      messagingToken,
    })

    if (sendResult) {
      reducers.signUp.setSigned()
      actions.analytics.signUpEvent({ action: 'signed', type: 'push' })
    }
    resolve(sendResult)
  })

const signUpWithEmail = (data) =>
  new Promise(async resolve => {
    const dataBasePath = 'usersSubscribed/emailNotification'
    const sendResult = submitUserData(dataBasePath, data)

    if (sendResult) {
      reducers.signUp.setSigned()
      actions.analytics.signUpEvent({ action: 'signed', type: 'email' })
    }
    resolve(sendResult)
  })

const isSupported = () => {
  const isLocalNet = process.env.LOCAL === 'local'
  const isSupportedServiceWorker = 'serviceWorker' in navigator
  const isSafari = ('safari' in window)
  const iOSSafari = /iP(ad|od|hone)/i.test(window.navigator.userAgent)
                  && /WebKit/i.test(window.navigator.userAgent)
                  && !(/(CriOS|FxiOS|OPiOS|mercury)/i.test(window.navigator.userAgent))

  return !isLocalNet && isSupportedServiceWorker && !iOSSafari && !isSafari
}

export default {
  getIPInfo,
  initialize,
  submitUserData,
  submitUserDataWidget,
  isSupported,
  signUpWithPush,
  signUpWithEmail,
}
