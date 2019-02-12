import React, { Fragment, Component } from 'react'

import config from 'app-config'
import { connect } from 'redaction'
import actions from 'redux/actions'
import helpers, { constants } from 'helpers'
import reducers from 'redux/core/reducers'

import CSSModules from 'react-css-modules'
import styles from '../Swap.scss'

import { BigNumber } from 'bignumber.js'

import { FormattedMessage } from 'react-intl'
import CopyToClipboard from 'react-copy-to-clipboard'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import Button from 'components/controls/Button/Button'
import QR from 'components/QR/QR'
import Timer from '../Timer/Timer'
import Tooltip from 'components/ui/Tooltip/Tooltip'
import InlineLoader from 'components/loaders/InlineLoader/InlineLoader'
import coinsWithDynamicFee from 'helpers/constants/coinsWithDynamicFee'


@CSSModules(styles)
export default class DepositWindow extends Component {

  constructor({ swap, flow, onCopyAddress, currencyData }) {
    super()

    this.swap = swap

    this.state = {
      swap,
      dynamicFee: 0,
      remainingBalance: this.swap.sellAmount,
      flow: swap.flow.state,
      isBalanceEnough: false,
      isAddressCopied: false,
      isBalanceFetching: false,
      scriptAddress: flow.scriptAddress,
      scriptBalance: flow.scriptBalance,
      balance: swap.sellCurrency === 'BTC' ? flow.scriptBalance : flow.balance,
      address: swap.sellCurrency === 'BTC' ? flow.scriptAddress : currencyData.address,
      currencyFullName: currencyData.fullName,
      sellAmount: this.swap.sellAmount,
    }
  }

  componentDidMount() {
    const { swap } =  this.props
    const { sellAmount, scriptBalance, balance } = this.state

    let checker
    this.getRequiredAmount()

    const availableBalance = swap.sellCurrency === 'BTC' ? scriptBalance : balance
    checker = setInterval(() => {
      if (availableBalance <= sellAmount) {
        this.updateBalance()
        this.checkThePayment()
      } else {
        clearInterval(checker)
      }
    }, 5000)
  }

  componentDidUpdate(prewProps, prevState) {
    if (this.state.balance !== prevState.balance) {
      this.updateRemainingBalance()
    }
  }

  updateBalance = async () => {
    const { swap } =  this.props
    const { sellAmount, scriptBalance, address, scriptAddress } =  this.state

    if (helpers.ethToken.isEthToken({ name: swap.sellCurrency.toLowerCase() })) {
      const currencyBalance = await actions.token.getBalance(swap.sellCurrency.toLowerCase())
      this.setState(() => ({ currencyBalance }))
    } else {
      const currencyBalance = await actions[swap.sellCurrency.toLowerCase()].getBalance()
      this.setState(() => ({ currencyBalance }))
    }

    const actualBalance = swap.sellCurrency === 'BTC' ? scriptBalance : (this.state.currencyBalance || 0)

    this.setState(() => ({
      balance: actualBalance,
      scriptBalance: swap.flow.state.scriptBalance,
      address: swap.sellCurrency === 'BTC' ? scriptAddress : address,
    }))
  }

  updateRemainingBalance = async () => {
    const { swap } = this.props
    const { sellAmount, balance, dynamicFee } = this.state

    const remainingBalance = new BigNumber(sellAmount).minus(balance)

    if (coinsWithDynamicFee.includes(swap.sellCurrency.toLowerCase())) {

      this.setState(() => ({
        remainingBalance,
        dynamicFee,
      }))
    } else {
      this.setState(() => ({
        remainingBalance,
      }))
    }
  }

  getRequiredAmount = async () => {
    const { swap, sellAmount } =  this.props

    if (coinsWithDynamicFee.includes(swap.sellCurrency.toLowerCase())) {
      const dynamicFee = await helpers[swap.sellCurrency.toLowerCase()].estimateFeeValue({ method: 'swap' })
      const newSellAmount = sellAmount.plus(dynamicFee)

      const requiredAmount = dynamicFee > 0 ? newSellAmount : sellAmount

      this.setState(() => ({
        dynamicFee,
        sellAmount: requiredAmount,
      }))
    }
  }

  checkThePayment = () => {
    if (this.state.sellAmount <= this.state.balance) {
      this.setState(() => ({
        isBalanceEnough: true,
      }))
    }
  }

  onCopyAddress = (e) => {
    // e.preventDefault()
    this.setState({
      isPressCtrl: true,
    })
  }

  handleReloadBalance = async () => {
    const { isBalanceFetching } = this.state

    this.updateBalance()

    this.setState({
      isBalanceFetching: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          isBalanceFetching: false,
        })
      }, 500)
    })
  }

  handleCopyAddress = (e) => {
    this.setState({
      isAddressCopied: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          isAddressCopied: false,
        })
      }, 500)
    })
  }

  handlerBuyWithCreditCard = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      swap,
      flow,
      balance,
      address,
      dynamicFee,
      sellAmount,
      isPressCtrl,
      flowBalance,
      missingBalance,
      isAddressCopied,
      isBalanceEnough,
      currencyFullName,
      remainingBalance,
      isBalanceFetching,
    } = this.state

    const balanceToRender = Math.floor(balance * 1e6) / 1e6

    return (
      <Fragment>
        <div
          styleName="topUpLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div styleName="top">
            {/* eslint-disable */}
              <div styleName="btcMessage">
                <FormattedMessage
                  id="deposit165"
                  defaultMessage="You don't have enought funds to continue the swap. Copy the address below and top it up with the recommended amount of {missingBalance} "
                  values={{ missingBalance:
                    <div>
                      {remainingBalance > 0
                      ? <strong>{`${remainingBalance}`} {swap.sellCurrency}{'  '}</strong>
                      : <span styleName="loaderHolder">
                          <InlineLoader />
                        </a>}
                        {swap.sellCurrency === "SWAP" && (
                          <strong>
                            <FormattedMessage
                              id="deposit213"
                              defaultMessage="and 0.002 ETH на gas fee"
                            />
                          </strong>)
                        }
                      <Tooltip id="dep170">
                        <div>
                          <FormattedMessage
                            id="deposit177"
                            defaultMessage="Do not top up the contract with the greater amount than recommended. The remaining balance will be send to the counter party. You can send {tokenName} from a wallet of any exchange"
                            values={{
                              amount: `${remainingBalance}`,
                              tokenName: swap.sellCurrency,
                              br: <br />
                            }}
                          />
                          {/* <p>
                            <FormattedMessage id="deposit181" defaultMessage="You can send {currency} from a wallet of any exchange" values={{ currency: `${swap.buyCurrency}` }} />
                          </p> */}
                        </div>
                      </Tooltip>
                    </div>,
                    amount: `${remainingBalance}`,
                    tokenName: swap.sellCurrency,
                    br: <br/>,
                  }}
                />
              </div>
              {/* eslint-enable */}
            <div styleName="qrImg">
              <QR
                network={currencyFullName.toLowerCase()}
                address={`${address}?amount=${remainingBalance}`}
                size={160}
              />
            </div>
          </div>
          <CopyToClipboard
            text={address}
            onCopy={this.onCopyAddress}
          >
            <div>
              <a styleName="linkText">
                <FormattedMessage
                  id="deposit256"
                  defaultMessage="The address of {tokenName} smart contract "
                  values={{
                    tokenName: swap.sellCurrency,
                  }}
                />
              </a>
              <p styleName="qr">
                <a
                  styleName="linkAddress"
                  onDoubleClick={this.onCopy}
                  onClick={this.onCopyAddress}
                >
                  {address}
                </a>
                <Button
                  brand
                  disabled={isAddressCopied}
                  fullWidth
                >
                  {isAddressCopied ? <i className="fas fa-copy fa-copy-in" /> : <i className="fas fa-copy" />}
                </Button>
              </p>
            </div>
          </CopyToClipboard>
          <div>
            <i className="fas fa-sync-alt" styleName="icon" onClick={this.handleReloadBalance} />
            {/* eslint-disable */}
            {isBalanceFetching
              ? (
                <a styleName="loaderHolder">
                  <InlineLoader />
                </a>
              ) : (
                <FormattedMessage
                  id="deposit300"
                  defaultMessage="Received {balance} / {need} {dynamicFee}{tooltip}"
                  values={{
                    br: <br />,
                    balance: <strong>{balanceToRender} {swap.sellCurrency}{'  '}</strong>,
                    need: <strong>{`${sellAmount}`} {swap.sellCurrency}</strong>,
                    dynamicFee: dynamicFee > 0 &&
                    <a>
                      <FormattedMessage
                        id="deposit307"
                        defaultMessage="(included {mineerFee} {sellCurrency} miners fee) "
                        values={{
                          mineerFee: dynamicFee,
                          sellCurrency: swap.sellCurrency,
                        }}
                      />
                      </a>,
                    tooltip:
                      <Tooltip id="dep226">
                        <FormattedMessage
                          id="deposit239"
                          defaultMessage="Swap will continue after {tokenName} contract receives the funds. Is usually takes less than 10 min"
                          values={{
                            tokenName: swap.sellCurrency,
                            br: <br />
                          }}
                        />
                      </Tooltip>
                  }}
                />
              )}
              <div>
              {isBalanceEnough
                ? <FormattedMessage id="deposit198.1" defaultMessage="create Ethereum Contract.{br}Please wait, it can take a few minutes..." values={{ br: <br /> }} />
                : <FormattedMessage id="deposit198" defaultMessage="waiting for payment..." />
              }
              <a styleName="loaderHolder">
                <InlineLoader />
              </a>
            </div>
            {/* eslint-enable */}
          </div>
          {flow.btcScriptValues !== null &&
          <div styleName="lockTime">
            <i className="far fa-clock" />
            <FormattedMessage
              id="Deposit52"
              defaultMessage="You have {timer} min to make the payment"
              values={{ timer: <Timer lockTime={flow.btcScriptValues.lockTime * 1000} defaultMessage={false} /> }} />
          </div>}
        </div>
      </Fragment>
    )
  }

}
