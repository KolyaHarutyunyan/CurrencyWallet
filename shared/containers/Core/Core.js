import React, { Component } from 'react'

import SwapApp from 'swap.app'
import actions from 'redux/actions'


export default class Core extends Component {

  state = {
    orders: [],
  }

  componentWillMount() {
    actions.core.getSwapHistory()
    SwapApp.services.orders
      .on('new orders', this.updateOrders)
      .on('new order', this.updateOrders)
      .on('order update', this.updateOrders)
      .on('remove order', this.updateOrders)
      .on('new order request', this.updateOrders)
    this.setIpfs()
  }

  componentWillUnmount() {
    SwapApp.services.orders
      .off('new orders', this.updateOrders)
      .off('new order', this.updateOrders)
      .off('order update', this.updateOrders)
      .off('remove order', this.updateOrders)
      .off('new order request', this.updateOrders)
    SwapApp.services.room.connection
      .off('peer joined', actions.ipfs.userJoined)
      .off('peer left', actions.ipfs.userLeft)
      .off('accept swap request', this.updateOrders)
      .off('decline swap request', this.updateOrders)
  }

  setIpfs = () => {
    setTimeout(() => {
      const isOnline = SwapApp.services.room.connection._ipfs.isOnline()
      const { peer } = SwapApp.services.room

      this.updateOrders()
      console.log('swap app', SwapApp)

      SwapApp.services.room
        .on('request partial closure', this.createOrder)

      SwapApp.services.room.connection
        .on('peer joined', actions.ipfs.userJoined)
        .on('peer left', actions.ipfs.userLeft)
        .on('accept swap request', this.updateOrders)
        .on('request partial closure', this.createOrder)
        .on('decline swap request', this.updateOrders)

      setTimeout(() => {
        actions.ipfs.set({
          isOnline,
          peer,
        })
      }, 1000)
    }, 8000)
  }

  updateOrders = () => {
    const orders = SwapApp.services.orders.items
    this.setState(() => ({
      orders,
    }))
    actions.core.updateCore(orders)
  }

  createOrder = async ({ fromPeer, order, ...rest }) => {
    console.log('rest', ...rest)
    const creatingOrder = await actions.core.createOrder(order)

    actions.core.requestToPeer('accept request', fromPeer, { orderId: creatingOrder.id })
  }

  render() {
    return null
  }
}
