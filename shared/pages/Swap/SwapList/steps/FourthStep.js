import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../SwapList.scss'
import { isMobile } from 'react-device-detect'

import { FormattedMessage } from 'react-intl'


const FourthStep = ({ step, swap, seventh, eighth }) => {

  const currencyStep = swap.sellCurrency === 'BTC' ? seventh : eighth

  return (
    <div
      style={(isMobile && (step >= currencyStep)) ? { paddingTop: '150px' } : {}}
      styleName={step >= currencyStep ? 'stepItem active checked' : 'stepItem'}>
      <span styleName="stepNumber">{step >= currencyStep ? <i className="fas fa-check" /> : 4}</span>
      <p styleName="stepText">
        <FormattedMessage
          id="completed21"
          defaultMessage="is completed!" />
      </p>
    </div>
  )
}

export default CSSModules(FourthStep, styles, { allowMultiple: true })
