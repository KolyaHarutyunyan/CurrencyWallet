import config from 'app-config'


const swap = (config && config.isWidget) ?
  []
  :
  [
    'ETH-BTC',
    'ETH-LTC',
    'LTC-BTC',
    'EOS-BTC',
  ]

Object.keys(config.erc20)
  .forEach(key => {
    swap.push(`${key.toUpperCase()}-BTC`)

    swap.push(`${key.toUpperCase()}-USDT`)
  })

export default [
  ...swap,
]
