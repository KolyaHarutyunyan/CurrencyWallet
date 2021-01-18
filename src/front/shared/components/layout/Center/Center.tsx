import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import cssModules from 'react-css-modules'
import styles from './Center.scss'

interface CenterProps {
  children: React.ReactNode,
  relative: boolean,
  scrollable: boolean,
  keepFontSize: boolean,
  centerVertically: boolean,
  centerHorizontally: boolean,
}


const Center = ({ children, scrollable, centerHorizontally, centerVertically, keepFontSize, relative, ...rest }: CenterProps) => {
  // TODO move overflow to Modal and any other cases where it belongs
  const styleName = cx('centringContainer', {
    'scrollable': scrollable,
    'centerHorizontally': centerHorizontally,
    'centerVertically': centerVertically,
    'keepFontSize': keepFontSize,
    'relative': relative,
  })

  return (
    <div styleName={styleName} {...rest}>
      <div styleName="centringContent">
        {children}
      </div>
    </div>
  )
}

Center.defaultProps = {
  relative: false,
  scrollable: false,
  keepFontSize: false,
  centerVertically: true,
  centerHorizontally: true,
}


export default cssModules(Center, styles, { allowMultiple: true })
