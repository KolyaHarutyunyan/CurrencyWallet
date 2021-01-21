import React from 'react'
import cssModules from 'react-css-modules'
import styles from './index.scss'
import { BigNumber } from 'bignumber.js'
import { FormattedMessage } from 'react-intl'

import Tooltip from 'components/ui/Tooltip/Tooltip'
import InlineLoader from 'components/loaders/InlineLoader/InlineLoader'

type FeeInfoBlockProps = {
  isLoading: boolean
  isEthToken: boolean
  hasTxSize: boolean
  
  currency: string
  activeFiat: string
  dataCurrency: string
  
  exCurrencyRate: number
  txSize?: number
  feeCurrentCurrency?: number
  
  minerFee: BigNumber
  serviceFee: BigNumber
  totalFee: BigNumber
  usedAdminFee: undefined | {
    address: string
    fee: number // prevent (%)
    min: number
  }
}

function FeeInfoBlock(props: FeeInfoBlockProps) {
  const {
    isEthToken,
    currency,
    activeFiat,
    dataCurrency,
    exCurrencyRate,
    isLoading,
    minerFee,
    serviceFee,
    usedAdminFee,
    totalFee,
    hasTxSize,
    txSize,
    feeCurrentCurrency,
  } = props

  const minerFeeTicker = dataCurrency
  const serviceFeeTicker = currency
  const activeFiatSymbol = 
    activeFiat.toLowerCase() === 'usd'
      ? '$' 
      : activeFiat.toLowerCase() === 'eur'
        ? '€'
        : '-'

  const linkToTxSizeInfo = (
    <a
      href="https://en.bitcoin.it/wiki/Maximum_transaction_rate#:~:text=Each%20transaction%20input%20requires%20at,the%20minimum-sized%20Bitcoin%20transaction"
      target="_blank"
    >
      (?)
    </a>
  )

  const transactionSize = (
    <>
      {feeCurrentCurrency}&nbsp;sat/byte * {txSize}&nbsp;bytes&nbsp;{linkToTxSizeInfo} ={' '}
    </>
  )

  return (
    <section styleName='feeInfoBlock'>
      <div styleName='feeRow'>
        <span styleName='feeRowTitle'>
          <FormattedMessage id="FeeInfoBlockMinerFee" defaultMessage="Miner fee:" />
        </span>
        <div className="feeRowInfo">
          {isLoading
            ? <div styleName='paleLoader'><InlineLoader /></div>
            : <span styleName='fee'>
                {hasTxSize && feeCurrentCurrency > 0 ? transactionSize : null}
                {+minerFee}&nbsp;{minerFeeTicker}
                {' '}
                (~{activeFiatSymbol}{new BigNumber(+minerFee * exCurrencyRate).toFixed(2)})
              </span>
          }
          {' '}
          <Tooltip id="FeeInfoBlockMinerFeeTooltip">
            <div style={{ maxWidth: '24em', textAlign: 'center' }}>
              <FormattedMessage
                id="FeeInfoBlockMinerFeeTooltip"
                defaultMessage="Amount of cryptocurrency paid to incentivize miners to confirm your transaction"
              />
            </div>
          </Tooltip>
        </div>
      </div>
      
      {usedAdminFee && (
          <div styleName='feeRow'>
            <span styleName='feeRowTitle'>
              <FormattedMessage id="FeeInfoBlockServiceFee" defaultMessage="Service fee:" />
            </span>
            <div className="feeRowInfo">
              <div styleName="serviceFeeConditions">
                <span>{usedAdminFee.fee}%</span>
                {' '}
                <span>
                  <FormattedMessage id="FeeInfoBlockServiceFeeConditions" defaultMessage="of the transfer amount, but not less than" />
                </span>
                {' '}
                <span>{usedAdminFee.min}&nbsp;{serviceFeeTicker}</span>
              </div>
              {isLoading
                ? <div styleName='paleLoader'><InlineLoader /></div>
                : <span styleName='fee'>
                    {+serviceFee}&nbsp;{serviceFeeTicker}
                    {' '}
                    (~{activeFiatSymbol}{new BigNumber(+serviceFee * exCurrencyRate).toFixed(2)})
                  </span>
              }
            </div>
          </div>
        )
      }

      {!isEthToken && (
        <div styleName='feeRow'>
          <span styleName='feeRowTitle'>
            <FormattedMessage id="FeeInfoBlockTotalFee" defaultMessage="Total fees you pay:" />
          </span>
          <div className="feeRowInfo">
            {isLoading
              ? <div styleName='paleLoader'><InlineLoader /></div>
              : <span styleName='fee'>
                  {+totalFee}&nbsp;{minerFeeTicker}
                  {' '}
                  (~{activeFiatSymbol}{new BigNumber(+totalFee * exCurrencyRate).toFixed(2)})
                </span>
            }
          </div>
        </div>
        )
      }
    </section>
  )
}

export default cssModules(FeeInfoBlock, styles, { allowMultiple: true })
