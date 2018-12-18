import reducers from 'redux/core/reducers'
import actions from 'redux/actions'
import { getState } from 'redux/core'
import SwapApp from 'swap.app'
import Swap from 'swap.swap'
import { constants } from 'helpers'


const getOrders = (orders) => {
  reducers.core.getOrders({ orders })
}

const getSwapById = (id) => new Swap(id)

const setFilter = (filter) => {
  reducers.core.setFilter({ filter })
}

const acceptRequest = (orderId, participantPeer) => {
  const order = SwapApp.services.orders.getByKey(orderId)
  order.acceptRequest(participantPeer)
}

const declineRequest = (orderId, participantPeer) => {
  const order = SwapApp.services.orders.getByKey(orderId)
  order.declineRequest(participantPeer)
}

const removeOrder = (orderId) => {
  SwapApp.services.orders.remove(orderId)
  actions.feed.deleteItemToFeed(orderId)
}

const sendRequest = (orderId, callback) => {
  const order = SwapApp.services.orders.getByKey(orderId)

  order.sendRequest(callback)
}

const createOrder = (data) => {
  return SwapApp.services.orders.create(data)
}

const requestToPeer = (event, peer, data, callback) => {
  SwapApp.services.orders.requestToPeer(event, peer, data, callback)
}

const updateCore = () => {
  const orders = SwapApp.services.orders.items

  getOrders(orders)
  getSwapHistory()
  actions.feed.getFeedDataFromOrder(orders)
}

const getSwapHistory = () => {
  const swapId = JSON.parse(localStorage.getItem('swapId'))

  if (swapId === null || swapId.length === 0) {
    return
  }

  const historySwap = swapId.map(item => getInformationAboutSwap(item))

  reducers.history.setSwapHistory(historySwap)
}

const getInformationAboutSwap = (swapId) => {
  if (swapId.length > 0 && typeof swapId === 'string') {
    return {
      ...SwapApp.env.storage.getItem(`swap.${swapId}`),
      ...SwapApp.env.storage.getItem(`flow.${swapId}`),
    }
  }
}

const markCoinAsHidden = (coin) => {
  let list = getState().core.hiddenCoinsList || []
  if (!list.includes(coin)) {
    reducers.core.markCoinAsHidden(coin)
    localStorage.setItem(constants.localStorage.hiddenCoinsList, JSON.stringify(getState().core.hiddenCoinsList))
  }
}

const markCoinAsVisible = (coin) => {
  reducers.core.markCoinAsVisible(coin)
  localStorage.setItem(constants.localStorage.hiddenCoinsList, JSON.stringify(getState().core.hiddenCoinsList))
}

export default {
  getSwapById,
  getOrders,
  setFilter,
  createOrder,
  getSwapHistory,
  updateCore,
  sendRequest,
  acceptRequest,
  declineRequest,
  removeOrder,
  markCoinAsHidden,
  markCoinAsVisible,
  requestToPeer,
  getInformationAboutSwap,
}
