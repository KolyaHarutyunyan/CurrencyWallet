import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from 'redaction'
import actions from 'redux/actions'
import Link from 'local_modules/sw-valuelink'
import {
  constants
} from 'helpers'

import cssModules from 'react-css-modules'
import styles from './SignUpModal.scss'

import Modal from 'components/modal/Modal/Modal'
import Button from 'components/controls/Button/Button'
import Input from 'components/forms/Input/Input'
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl'

import getTopLocation from 'helpers/getTopLocation'


const title = defineMessages({
  signUpModal: {
    id: 'SignUpModal55',
    defaultMessage: 'Sign up',
  },
})

@withRouter
@connect(
  ({
    user: { ethData, btcData, ghostData, nextData },
    signUp: { isSigned },
  }) => ({
    ethAddress: ethData.address,
    btcAddress: btcData.address,
    ghostAddress: ghostData.address,
    nextAddress: nextData.address,
    isSigned,
  })
)
@cssModules(styles)
class SignUpModal extends React.Component<any, any> {

  props: any

  static propTypes = {
    name: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      isSubmitedPush: false,
      isSubmitedEmail: false,
      isPushError: false,
      isEmailError: false,
      email: '',
    }
  }

  validateEmail = (value) => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)

  handleSubmit = async (whatToSubmit) => {
    const { name, ethAddress, btcAddress, ghostAddress, nextAddress, history } = this.props
    const { isSupportedPush, email, isSubmitedPush } = this.state

    const currentUrl = history.location
    const isRefLink = (currentUrl.search
      && currentUrl.search.includes('?promo=')
      //@ts-ignore
      && !localStorage.getItem(constants.localStorage.firstStart))
    let refEthAddress = null

    if (isRefLink) {
      // eslint-disable-next-line prefer-destructuring
      refEthAddress = currentUrl.search.split('?promo=')[1].split('&')[0]
    }

    const data = {
      ethAddress,
      btcAddress,
      ghostAddress,
      nextAddress,
      Referrer: refEthAddress,
      registrationDomain: getTopLocation().host,
      userAgentRegistration: navigator.userAgent,
    }

    //@ts-ignore
    actions.analytics.signUpEvent({ action: 'request' })
  }

  close = () => {
    const { name, data } = this.props

    actions.modals.close(name)
    if (typeof data.onClose === 'function') {
      data.onClose()
    }
  }

  render() {
    const { isSubmitedEmail, isSubmitedPush, isSupportedPush, isPushError, isEmailError, email } = this.state
    const { name, intl, data, isSigned } = this.props
    const isDisabled = isSupportedPush
      ? isSubmitedPush
        ? !isSubmitedEmail && !this.validateEmail(email)
        : false
      : isSubmitedEmail || !this.validateEmail(email)

    const linked = Link.all(this, 'email')

    return (
      <Modal name={name} title={intl.formatMessage(title.signUpModal)} data={data} delayClose>
        {
          isSigned || isEmailError ? (
            <Fragment>
              {
                isEmailError && (
                  <p styleName="result">
                    <FormattedMessage id="SignUpModal133" values={{ br: <br /> }} defaultMessage="Something went wrong.{br}Try it later" />
                  </p>
                )
              }
              {
                isSigned && (
                  <p styleName="result">
                    <FormattedMessage id="SignUpModal000" values={{ br: <br /> }} defaultMessage="Thanks!{br}You will receive a notification" />
                  </p>
                )
              }
              <Button styleName="button" brand fullWidth onClick={this.close}>
                <FormattedMessage id="SignUpModal001" defaultMessage="Go to my wallet" />
              </Button>
            </Fragment>
          ) : (
              <Fragment>
                {
                  <div styleName="input-wrapper">
                    {
                      (!isSupportedPush || isPushError || isSubmitedPush) && (
                        <Input styleName="input" valueLink={linked.email} focusOnInit type="email" placeholder="E-mail" />
                      )
                    }
                  </div>
                }
                <Button
                  styleName="button"
                  brand
                  fullWidth
                  disabled={isDisabled}
                  onClick={() => this.handleSubmit(!isSubmitedPush
                    ? 'isSubmitedPush'
                    : 'isSubmitedEmail'
                  )}
                >
                  {
                    isSubmitedPush
                      ? isDisabled
                        ? (
                          <FormattedMessage id="SignUpModal002-1" defaultMessage="One more step" />
                        )
                        : (
                          <FormattedMessage id="SignUpModal002" defaultMessage="Sign up" />
                        )
                      : (
                        <FormattedMessage id="SignUpModal003" defaultMessage="Allow notifications" />
                      )
                  }
                </Button>
                {
                  !isPushError ? (
                    <p styleName="info">
                      <FormattedMessage
                        id="SignUpModal004"
                        values={{ br: <br /> }}
                        defaultMessage="You will receive notifications regarding updates with your account (orders, transactions){br}and monthly updates about our project" />
                    </p>
                  ) : (
                      <p styleName="info">
                        <FormattedMessage
                          id="SignUpModal005"
                          values={{ br: <br /> }}
                          defaultMessage="It seems like push notification is not working{br}Please, leave your email for notifications,{br}or try later" />
                      </p>
                    )
                }
              </Fragment>
            )
        }
      </Modal>
    )
  }
}

export default injectIntl(SignUpModal)
