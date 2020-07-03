import axios from 'axios'
import { constants, localStorage } from 'helpers'


const saveUserData = function saveUserData() {
  const interval = window.setInterval(() => {
    const isWalletCreate = localStorage.getItem(constants.localStorage.isWalletCreate)

    if (isWalletCreate && window.userDataPluginApi && window.WPuserUid) {
      const { user } = localStorage.getItem('redux-store')

      const curKeys = Object.keys(user).filter(el => {
        if (el !== 'tokensData') {
          return el.includes('Data')
        }
        return false
      })

      const data = {}
      curKeys.forEach(el => {
        const { address, balance } = user[el]

        if (address) {
          data[el] = {
            address,
            balance,
          }
        }

      })

      Object.keys(user.tokensData).forEach((key) => {
        const { balance, address } = user.tokensData[key]
        if (address) {
          data[key] = {
            balance,
            address,
          }
        }
      })

      if (data && Object.values(data).length) {
        axios.post(window.userDataPluginApi, {
          ...data,
          WPuserUid: window.WPuserUid,
        })
      }
      window.clearInterval(interval)
    }
  }, 10000)
}

export default saveUserData
