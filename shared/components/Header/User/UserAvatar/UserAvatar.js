import React, { Component } from 'react'

import CSSModules from 'react-css-modules'
import styles from './UserAvatar.scss'


@CSSModules(styles, { allowMultiple: true })
export default class UserAvatar extends Component {

  state = {
    feeds: null,
    animation: 'user',
  }

  handleClick = () => {
    const { isToggle } = this.props

    isToggle()
  }


  componentWillReceiveProps(nextProps) {
    const { feeds, soundClick } = this.props

    let update
    if (feeds.length !== 0) {
      update = nextProps.feeds.length > feeds.length
    }

    if (update) {

      this.setState({
        feeds: nextProps.feeds,
        animation: 'user shake',
      })

      setTimeout(() => {
        this.setState({
          animation: 'user',
        })
      }, 820)

      soundClick()
    }
  }


  render() {
    const { animation } = this.state

    return (
      <div styleName={animation} onClick={this.handleClick} >
        <span styleName="name">K</span>
      </div>
    )
  }
}

