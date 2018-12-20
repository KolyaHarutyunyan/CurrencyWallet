import React from 'react'
import PropTypes from 'prop-types'

import CSSModules from 'react-css-modules'
import styles from './Timer.scss'
import { FormattedMessage } from 'react-intl'


@CSSModules(styles)
export default class Timer extends React.Component {

  static propTypes = {
    lockTime: PropTypes.number,
  }

  timer = null

  constructor({ lockTime }) {
    super()

    this.state = {
      lockTime,
      timeLeft: null,
    }
  }

  componentDidMount() {
    this.tick()
  }

  componentWillMount() {
    const { lockTime } = this.state

    const dateNow = new Date().getTime()
    const timeLeft = lockTime - dateNow

    this.setState({
      timeLeft,
    })
  }

  tick = () => {
    const { timeLeft } = this.state
    const newTimeLeft = timeLeft - 1000

    if (newTimeLeft <= 0) {
      this.props.enabledButton()
    }
    else {
      this.timer = setTimeout(this.tick, 1000)
      this.setState({
        timeLeft: newTimeLeft,
      })
    }
  }

  render() {
    const { timeLeft } = this.state
    const min = Math.ceil(timeLeft / 1000 / 60)

    return (
      <div styleName="timer">
        {
          min > 0 ? (
            <FormattedMessage
              id="timer67"
              defaultMessage="{min} minute left for refund"
              values={{ min: `${min}` }}
            />
          ) : (
            <FormattedMessage id="timer68" defaultMessage="refund ready" />
          )
        }
      </div>
    )
  }

}
