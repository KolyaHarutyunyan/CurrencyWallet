import config from 'app-config'
import constants from './constants'
import api from './api'
import BigNumber from 'bignumber.js'

type EstimateFeeOptions = {
  method: string
  speed: 'fastest' | 'fast' | 'slow'
}

const reportAboutProblem = (params) => {
  const { isError = false, info } = params

  console.group(
    'HELPERS >%c eth.ts',
    `color: ${isError ? 'red' : 'yellow'};`
  )
  isError ? console.error(info) : console.warn(info)
  console.groupEnd()
}

const estimateFeeValue = async (options: EstimateFeeOptions) => {
  const { method, speed } = options
  const gasPrice = await estimateGasPrice({ speed })
  const feeValue = new BigNumber(constants.defaultCurrencyParameters.eth.limit[method])
    .multipliedBy(gasPrice)
    .multipliedBy(1e-18)
    .toNumber()

  return feeValue
}

const estimateGasPrice = async ({ speed = 'fast' } = {}) => {
  const link = config.feeRates.eth
  const defaultPrice = constants.defaultCurrencyParameters.eth.price

  if (!link) {
    return defaultPrice[speed]
  }

  let apiResult

  try {
    apiResult = await api.asyncFetchApi(link)
  } catch (err) {
    reportAboutProblem({ info: err.message })
    return defaultPrice[speed]
  }

  const apiSpeeds = {
    slow: 'safeLow',
    fast: 'fast',
    fastest: 'fastest',
  }

  const apiSpeed = apiSpeeds[speed] || apiSpeeds.fast
  /* 
  * api returns gas price in x10 Gwei
  * divided by 10 to convert it to gwei
  */
  const apiPrice = new BigNumber(apiResult[apiSpeed]).dividedBy(10).multipliedBy(1e9)

  return apiPrice >= defaultPrice[speed] 
    ? apiPrice.toString()
    : defaultPrice[speed]
}

export default {
  estimateFeeValue,
  estimateGasPrice,
}
