import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import cssModules from 'react-css-modules'
import styles from './Row.scss'

import Coins from 'components/Coins/Coins'


@cssModules(styles)
export default class Row extends Component {

  static propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }

  render() {
    const { from, to } = this.props

    return (
      <tr>
        <td>
          <Coins styleName="coins" names={[ from, to ]} size={40} />
        </td>
        <td>
          <span>{from.toUpperCase()}-{to.toUpperCase()}</span>
        </td>
        <td>
          <Link styleName="button" to={`/exchange/${from}-${to}`}>Trade</Link>
        </td>
      </tr>
    )
  }
}
