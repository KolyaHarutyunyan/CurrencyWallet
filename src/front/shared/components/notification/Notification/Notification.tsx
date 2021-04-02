import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import actions from 'redux/actions'
import cssModules from 'react-css-modules'
import styles from './Notification.scss'
import { constants } from 'helpers'
import web3Icons from 'images'
import Sound from 'helpers/Sound/alert.mp4'

const isDark = localStorage.getItem(constants.localStorage.isDark)

const Notification = (props) => {
  const {
    soundPlay = true,
    className,
    children,
    name,
    type,
  } = props
  const [isMounted, setIsMounted] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (soundPlay) {
      soundClick()
    }

    const timeout = setTimeout(closeNotification, 8000)

    return () => clearTimeout(timeout)
  }, [isMounted])

  const closeNotification = () => {
    setIsRemoved(true)
    setTimeout(() => actions.notifications.hide(name), 300)
  }

  const soundClick = () => {
    const audio = new Audio()
    audio.src = Sound
    audio.autoplay = true
  }

  const containerStyleName = cx('container', {
    'mounted': isMounted,
    'removed': isRemoved,
    'dark': isDark,
  })

  const notificationStyleName = cx('notification', {
    'mounted': isMounted,
    'removed': isRemoved,
    'errorNotification': type === 'ErrorNotification',
  })

  return (
    <div styleName={containerStyleName}>
      <div styleName={notificationStyleName}>
        <div styleName="content" className={className}>
          {children}
        </div>

        <button styleName="closeButton" onClick={closeNotification}>
          <img src={web3Icons.close} alt="close button"/>
        </button>
      </div>
    </div>
  )
}

export default cssModules(Notification, styles, { allowMultiple: true })
