import React, { PureComponent } from 'react'
import Swap from 'swap.swap'

import InlineLoader from 'components/loaders/InlineLoader/InlineLoader'

import BtcToEth from './BtcToEth'
import EthToBtc from './EthToBtc'
import EthTokenToBtc from './EthTokenToBtc'
import BtcToEthToken from './BtcToEthToken'


const swapComponents = {
  'BTC2ETH': BtcToEth,
  'ETH2BTC': EthToBtc,
  'NOXON2BTC': EthTokenToBtc,
  'BTC2NOXON': BtcToEthToken,
  'SWAP2BTC': EthTokenToBtc,
  'BTC2SWAP': BtcToEthToken,
}


export default class SwapComponent extends PureComponent {

  state = {
    tokenName: null,
  }

  componentWillMount() {
    const { match : { params : { sell, buy } } } = this.props
    let tokenName

    if (sell !== 'ETH' && sell !== 'BTC') {
      tokenName = sell
    }
    else if (buy !== 'ETH' && buy !== 'BTC') {
      tokenName = buy
    }

    this.setState({
      tokenName,
    })
  }

  render() {
    const { tokenName } = this.state
    const { match : { params : { orderId } } } = this.props

    if (!orderId) {
      return (
        <div>
          <h3>The order creator is offline. Waiting for him..</h3>
          <InlineLoader />
        </div>
      )
    }

    const swap = new Swap(orderId)
    const SwapComponent = swapComponents[swap.flow._flowName.toUpperCase()]

    return (
      <div style={{ paddingLeft: '30px', paddingTop: '30px' }}>
        <SwapComponent swap={swap} tokenName={tokenName} />
      </div>
    )
  }
}
