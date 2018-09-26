import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redaction'
import moment from 'moment-with-locales-es6'
import actions from 'redux/actions'
import Link from 'sw-valuelink'
import { localStorage, constants } from 'helpers'

import cssModules from 'react-css-modules'
import styles from './PrivateKeysModal.scss'

import Field2 from './Field2/Field2'
import Modal from 'components/modal/Modal/Modal'
import Button from 'components/controls/Button/Button'


const views = {
  saveKeys: 'saveKeys',
  checkKeys: 'checkKeys',
}

@connect({
  ethData: 'user.ethData',
  btcData: 'user.btcData',
})
@cssModules(styles, { allowMultiple: true })
export default class PrivateKeysModal extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string,
    ethData: PropTypes.object.isRequired,
    btcData: PropTypes.object.isRequired,
  }

  state = {
    view: views.saveKeys,
    ethValidated: false,
    btcValidated: false,
  }

  changeView = (view) => {
    this.setState({
      view,
    })
  }

  close = () => {
    const { name } = this.props

    localStorage.setItem(constants.localStorage.privateKeysSaved, true)
    actions.modals.close(name)
  }

  handleProceed = () => {
    this.changeView(views.checkKeys)
  }

  handleDownload = () => {
    actions.user.downloadPrivateKeys()
    actions.notifications.show(constants.notifications.Message, {
      message: 'Check your browser downloads',
    })

    this.changeView(views.checkKeys)
  }

  handleSendByEmail = () => {
    const text = this.getText()

    window.open(`mailto:?subject=Your_Subject&body=${text}`)
  }

  handleKeysSubmit = () => {
    localStorage.setItem(constants.localStorage.privateKeysSaved, true)
    window.location.reload()
  }

  render() {
    const { view } = this.state
    const { name, ethData, btcData } = this.props

    const ethValidated = Link.state(this, 'ethValidated')
    const btcValidated = Link.state(this, 'btcValidated')
    const isValidated = ethValidated.value && btcValidated.value

    return (
      <Modal
        styleName="modal"
        name={name}
        showCloseButton={false}
        showLogo={false}
        title="CAUTION!"
      >
        <a
          href={`data:text/plaincharset=utf-8,${encodeURIComponent(actions.user.getText())}`}
          download={`${window.location.hostname}_keys_${moment().format('DD.MM.YYYY')}.txt`}
          ref={ref => { this.downloadInstructionsAnchor = ref }}
          style={{ display: 'none' }}
        >
          Download Instructions
        </a>
        <div styleName="content">
          {
            view === views.saveKeys ? (
              <Fragment>
                <div styleName="title">
                  Before you continue be sure to save your private keys!<br />
                  It`s very important because If you don`t<br />
                  there is a big chance you`ll loose your money.
                </div>
                <div styleName="subTitle">We don`t store your private keys and will not be able to restore them!</div>
                <div styleName="buttonContainer">
                  <Button brand styleName="button" onClick={this.handleDownload}>Download instruction</Button>
                  <Button brand styleName="button" onClick={this.handleProceed}>Proceed without downloading</Button>
                </div>
                {/* <Button brand styleName="button" onClick={this.handleSendByEmail}>Send by email</Button> */}
              </Fragment>
            ) : (
              <Fragment>
                <div styleName="title">
                  Please fill information below from instruction.txt file. We`d like to be sure that you saved the private keys
                  before you can continue to the site.
                </div>
                <Field2
                  label={ethData.currency}
                  privateKey={ethData.privateKey}
                  valueLink={ethValidated}
                />
                <Field2
                  label={btcData.currency}
                  privateKey={btcData.privateKey}
                  valueLink={btcValidated}
                />
                {
                  isValidated && (
                    <Button white styleName="button" onClick={this.handleKeysSubmit}>GO TO THE SITE!</Button>
                  )
                }
              </Fragment>
            )
          }
        </div>
      </Modal>
    )
  }
}
