import React, { PureComponent } from 'react'
import SwapApp from 'swap.app'

import InlineLoader from 'components/loaders/InlineLoader/InlineLoader'

import BtcToEth from './BtcToEth'
import EthToBtc from './EthToBtc'
import EthTokenToBtc from './EthTokenToBtc'
import BtcToEthToken from './BtcToEthToken'


const swapComponents = {
  'btceth': BtcToEth,
  'ethbtc': EthToBtc,
  'noxonbtc': EthTokenToBtc,
  'btcnoxon': BtcToEthToken,
}


export default class Swap extends PureComponent {

  state = {
    tokenName: 'noxon',
  }

  constructor({ match: { params: { orderId } } }) {
    super()

    this.order = SwapApp.services.orders.getByKey(orderId)
  }

  componentWillMount() {
    const { match : { params : { sell, buy } } } = this.props

    if (sell === 'noxon' || buy === 'noxon') {
      this.setState({
        tokenName: 'noxon',
      })
    } else {
      this.setState({
        tokenName: 'swap',
      })
    }
  }

  render() {
    const { tokenName } = this.state
    const { match : { params : { sell, buy } } } = this.props

    if (!this.order) {
      return (
        <div>
          <h3>The order creator is offline. Waiting for him..</h3>
          <InlineLoader />
        </div>
      )
    }
    const SwapComponent = swapComponents[`${buy.toLowerCase()}${sell.toLowerCase()}`]

    return (
      <div style={{ paddingLeft: '30px', paddingTop: '30px' }}>
        <SwapComponent orderId={this.order.id} tokenName={tokenName} />
      </div>
    )
  }
}