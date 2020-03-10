import React, { Component, Fragment } from 'react'

import { constants } from 'helpers'
import actions from 'redux/actions'

import security from '../NotityBlock/images/security.svg'
import mail from '../NotityBlock/images/mail.svg'
import info from '../NotityBlock/images/info-solid.svg'

import NotifyBlock from 'pages/Wallet/components/NotityBlock/NotifyBock'
import config from 'app-config'

import { FormattedMessage } from 'react-intl'

const isWidgetBuild = config && config.isWidget

export default class WallerSlider extends Component {
  constructor(props) {
    super(props)

    const mnemonic = localStorage.getItem(constants.privateKeyNames.twentywords)
    const mnemonicDeleted = mnemonic === '-'

    this.state = {
      mnemonicDeleted
    }
  }

  componentDidMount() {
    var starterSwiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 10
    })
  }

  handleShowKeys = () => {
    actions.modals.open(constants.modals.DownloadModal)
  }

  handleSaveKeys = () => {
    actions.modals.open(constants.modals.PrivateKeys)
  }

  handleShowMnemonic = () => {
    actions.modals.open(constants.modals.SaveMnemonicModal, {
      onClose: () => {
        const mnemonic = localStorage.getItem(constants.privateKeyNames.twentywords)
        const mnemonicDeleted = mnemonic === '-'
        if (mnemonicDeleted) {
          const { handleNotifyBlockClose } = this.props
          handleNotifyBlockClose()
        }
        this.setState({
          mnemonicDeleted
        })
      }
    })
  }

  handleSignUp = () => {
    actions.modals.open(constants.modals.SignUp)
  }

  render() {
    const { banners } = this.props

    console.log(banners)

    const { mnemonicDeleted } = this.state

    const isPrivateKeysSaved = localStorage.getItem(constants.localStorage.privateKeysSaved)

    let firstBtnTitle = <FormattedMessage id="descr282" defaultMessage="Show my keys" />
    if (!mnemonicDeleted) firstBtnTitle = <FormattedMessage id="ShowMyMnemonic" defaultMessage="Показать 12 слов" />

    return isWidgetBuild ? null : (
      <Fragment>
        <div className="swiper-container" style={{ marginTop: '20px', marginBottom: '40px' }}>
          <div className="swiper-wrapper">
            {!isPrivateKeysSaved && (
              <div className="swiper-slide">
                <NotifyBlock
                  className="notifyBlockSaveKeys"
                  icon={security}
                  firstBtn={firstBtnTitle}
                  widthIcon="80"
                  background="6144e5"
                  firstFunc={mnemonicDeleted ? this.handleShowKeys : this.handleShowMnemonic}
                  secondBtn={<FormattedMessage id="descr284" defaultMessage="I saved my keys" />}
                  secondFunc={handleNotifyBlockClose}
                />
              </div>
            )}
            {banners &&
              banners.map(banner => (
                <div className="swiper-slide">
                  <NotifyBlock background={`${banner[3]}`} descr={banner[2]} link={banner[4]} />
                </div>
              ))}
          </div>
        </div>
      </Fragment>
    )
  }
}
