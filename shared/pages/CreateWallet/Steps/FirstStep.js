import React, { Component } from 'react'

import { connect } from 'redaction'

import CSSModules from 'react-css-modules'
import styles from '../CreateWallet.scss'

import reducers from 'redux/core/reducers'
import { isMobile } from 'react-device-detect'

import ReactTooltip from 'react-tooltip'
import { FormattedMessage } from 'react-intl'
import Coin from 'components/Coin/Coin'

import Explanation from '../Explanation'
import icons from '../images'
import config from 'app-config'

import Cupture
, {
  subHeaderText1,
  subHeaderText2,
  cupture2,
} from './texts'




const isWidgetBuild = config && config.isWidget

@connect(({ currencies: { items: currencies } }) => ({ currencies }))
@CSSModules(styles, { allowMultiple: true })
export default class CreateWallet extends Component {
  defaultStartPack = [
    { name: "BTC", capture: "Bitcoin" },
    { name: "ETH", capture: "Ethereum" },
    { name: "SWAP", capture: "Swap" },
    { name: "USDT", capture: "Tether" },
    { name: "EURS", capture: "Eurs" },
  ]

  widgetStartPack = [
    { name: "BTC", capture: "Bitcoin" },
    { name: "ETH", capture: "Ethereum" },
  ]

  constructor(props) {
    super()
    const { currencies } = props

    const items = currencies.filter(({ addAssets, name }) => addAssets)
    const untouchable = this.defaultStartPack.map(({ name }) => name)

    const coins = items
      .map(({ name, fullTitle }) => ({ name, capture: fullTitle }))
      .filter(({ name }) => !untouchable.includes(name))

    const curState = {}
    items.forEach(({ currency }) => { curState[currency] = false })
    if (isWidgetBuild && config && config.erc20) {
      if (window && window.widgetERC20Tokens && Object.keys(window.widgetERC20Tokens).length) {
        // Multi token build
        Object.keys(window.widgetERC20Tokens).forEach( (tokenSymbol) => {
          if (config.erc20[tokenSymbol]) {
            this.widgetStartPack.push({
              name: tokenSymbol.toUpperCase(),
              capture: config.erc20[tokenSymbol].fullName,
            })
          }
        })
      } else {
        // Single token build
        if (config.erc20[config.erc20token]) {
          this.widgetStartPack.push({
            name: config.erc20token.toUpperCase(),
            capture: config.erc20[config.erc20token].fullName,
          })
        }
      }
    }
    this.state = { curState, coins, startPack: (isWidgetBuild) ? this.widgetStartPack : this.defaultStartPack }
  }


  handleClick = name => {
    const { setError } = this.props
    const { curState } = this.state

    const dataToReturn = { [name]: !curState[name] }
    this.setState(() => ({ curState: dataToReturn }))
    reducers.createWallet.newWalletData({ type: 'currencies', data: dataToReturn })
    setError(null)
  }

  etcClick = () => {
    const { coins, startPack, all } = this.state
    let newStartPack = this.defaultStartPack
    if (!all) {
      newStartPack = [{
        name: 'Custom ERC20',
        capture: <FormattedMessage id="createWallet_customERC20" defaultMessage="Подключить токен" />,
      }, ...startPack, ...coins]
    }
    this.setState(() => ({ startPack: newStartPack, all: !all }))
  }

  render() {
    const { onClick, error } = this.props
    const { curState, startPack, all } = this.state

    const coloredIcons = ['btc', 'eth', 'swap', 'bch', 'usdt', 'eurs']
    return (
      <div>
        <div>
          <div>
            <Explanation step={1} subHeaderText={subHeaderText1()}>
              {!isWidgetBuild && (
                <Cupture click={this.etcClick} step={1} />
              )}
            </Explanation>
            <div styleName={`currencyChooserWrapper ${startPack.length < 4 ? "smallArr" : ""}`}>
              {startPack.map(el => {
                const { name, capture } = el

                return (
                  <div key={name} styleName={`card ${curState[name] ? 'purpleBorder' : ''}`} onClick={() => this.handleClick(name)}>
                    <div styleName="logo">
                      <Coin styleName={`assetsTableIcon ${coloredIcons.includes(name.toLowerCase()) ? name.toLowerCase() : "coinColor"}`} name={name} />
                    </div>
                    <div styleName="listGroup">
                      <li><b>{name}</b></li>
                      <li>{capture}</li>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <button styleName="continue" onClick={onClick} disabled={error}>
            <FormattedMessage id="createWalletButton1" defaultMessage="Продолжить" />
          </button>
        </div>
        {
          !isMobile &&
          <div>
            <Explanation step={2} subHeaderText={subHeaderText2()} notMain>
              {cupture2()}
            </Explanation>
          </div>
        }
      </div >
    )
  }

}
