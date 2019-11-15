import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { isMobile } from 'react-device-detect'
import { connect } from 'redaction'
import { constants } from 'helpers'
import { localisedUrl } from 'helpers/locale'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'react-router'
import actions from 'redux/actions'
import { links }    from 'helpers'
import Button from 'components/controls/Button/Button'

import moment from 'moment'

import CSSModules from 'react-css-modules'
import styles from './Btc.scss'

import config from 'app-config'

@connect(({
  user: {
    btcMultisigUserData,
  },
}) => {
  return {
    data: btcMultisigUserData,
  }
})
@injectIntl
@CSSModules(styles, { allowMultiple: true })
export default class Btc extends PureComponent {

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    intl: PropTypes.object.isRequired,
  };

  constructor() {
    console.log('Btc mulsign connected')
    super()
    
    this.state = {
      action: 'none',
      wallet: {},
      walletBalance: 0,
      publicKey: '',
    }
  }

  async componentWillMount() {
    let { match : { params : { action, data } }, history, location: { pathname } } = this.props
    if ((action !== 'join') && (action !== 'connect') && (action !== 'confirm')) {
      this.props.history.push(localisedUrl(links.notFound))
      return
    }
    if (action === 'join' || action === 'connect') {
      if (data && data.length==66) {
        const privateKey = this.props.data.privateKey
        const publicKey = data
        const walletData = actions.btcmultisig.login_USER(privateKey, publicKey, true)
        const balance = await actions.btcmultisig.fetchBalance( walletData.address )
        const myPublicKey = this.props.data.publicKey.toString('hex')

        this.setState( {
          action,
          wallet: walletData,
          walletBalance: balance,
          privateKey,
          publicKey,
          joinLink: `${location.origin}${links.multisign}/btc/connect/${myPublicKey}`,
        })
      } else {
        this.props.history.push(localisedUrl(links.notFound))
      }
    }
    console.log('Btc mulsign processor')
    console.log('action',action)
    console.log('data',data)
  }

  handleAddWallet = async() => {
    const { privateKey, publicKey, action } = this.state
    localStorage.setItem(constants.privateKeyNames.btcMultisigOtherOwnerKey, publicKey)
    actions.btcmultisig.login_USER(privateKey, publicKey)

    this.setState({
      action: (action === 'join') ? 'linkready' : 'ready'
    })
  }

  handleGoToWallet = async() => {
    this.props.history.push(localisedUrl(links.currencyWallet))
  }

  render() {
    const { action } = this.state
    const { wallet, walletBalance, joinLink } = this.state

    return (
      <section>
        { (action === 'join' || action === 'connect') && 
        <Fragment>
          <h1>Create BTC-multisignature wallet</h1>
          
          <div>
            <label>Wallet address:</label>
            <strong>{wallet.address}</strong>
          </div>
          <div>
            <label>Wallet balance:</label>
            <strong>{walletBalance} BTC</strong>
          </div>
          <Button brand onClick={this.handleAddWallet}>Add wallet</Button>
        </Fragment>
        }
        { (action === 'linkready' || action === 'ready') && 
        <Fragment>
          <h1>Create BTC-multisignature wallet</h1>
          { action === 'linkready' && <h2>Wallet created. Send this link to other owner for confirm</h2> }
          { action === 'ready' && <h2>Wallet created.</h2> }
          { action === 'linkready' && <span>{joinLink}</span> }
          <div>
            <Button brand onClick={this.handleGoToWallet}>Ready. Go to wallet</Button>
          </div>
        </Fragment>
        }
      </section>
    )
  }
}
