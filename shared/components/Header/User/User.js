import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'
import actions from 'redux/actions'
import { connect } from 'redaction'
import { constants } from 'helpers'

import styles from './User.scss'
import CSSModules from 'react-css-modules'
import Sound from 'helpers/Sound/Sound.mp4'

import Question from './Question/Question'
import UserAvatar from './UserAvatar/UserAvatar'
import UserTooltip from './UserTooltip/UserTooltip'
import SignUpButton from './SignUpButton/SignUpButton'

import Avatar from 'components/Avatar/Avatar'
import { injectIntl } from 'react-intl'
import { localisedUrl } from 'helpers/locale'


@withRouter
@injectIntl
@connect({
  feeds: 'feeds.items',
  peer: 'ipfs.peer',
  isSigned: 'signUp.isSigned',
})
@CSSModules(styles)
export default class User extends React.Component {

  static propTypes = {
    feeds: PropTypes.array.isRequired,
    peer: PropTypes.string.isRequired,
  }

  static defaultProps = {
    peer: null,
    feeds: [],
  }

  state = {
    view: true,
  }

  handleChangeView = () => {
    this.setState({ view: true })
  }

  handleToggleTooltip = () => {
    this.setState({
      view: !this.state.view,
    })
  }

  soundClick = () => {
    let audio = new Audio()
    audio.src = Sound
    audio.autoplay = true
  }

  declineRequest = (orderId, participantPeer) => {
    actions.core.declineRequest(orderId, participantPeer)
    actions.core.updateCore()
  }

  acceptRequest = async (orderId, participantPeer, link) => {
    const { toggle, history, intl: { locale } } = this.props

    actions.core.acceptRequest(orderId, participantPeer)
    actions.core.updateCore()

    if (typeof toggle === 'function') {
      toggle()
    }

    await history.replace(localisedUrl(locale, '/'))
    await history.push(localisedUrl(locale, link))
  }

  render() {
    const { view } = this.state

    const {
      feeds, peer, reputation, openTour, path, isSigned,
    } = this.props

    return (
      <div styleName="user-cont">
        {!isSigned && (<SignUpButton />)}
        {path && (<Question openTour={openTour} />)}
        <UserAvatar
          isToggle={this.handleToggleTooltip}
          feeds={feeds}
          declineRequest={this.declineRequest}
          getInfoBySwapId={actions.core.getInformationAboutSwap}
          soundClick={this.soundClick}
          changeView={this.handleChangeView}
        />
        {
          view && <UserTooltip
            feeds={feeds}
            peer={peer}
            toggle={this.handleToggleTooltip}
            acceptRequest={this.acceptRequest}
            declineRequest={this.declineRequest}
          />
        }
        {!!peer && (
          <Avatar
            className={styles.avatar}
            value={peer}
            size={40}
          />
        )}
      </div>
    )
  }
}
