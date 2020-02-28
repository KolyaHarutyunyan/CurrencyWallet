import config from 'app-config'
import actions from 'redux/actions'
import reducers from 'redux/core/reducers'
import { getState } from 'redux/core'
const pullTransactions = transactions => {
  let data = [].concat([], ...transactions).sort((a, b) => b.date - a.date)
  reducers.history.setTransactions(data)
}

const delay = (ms) => new Promise(resolve => setTimeout(() => resolve(true), ms))

const setTransactions = async (address, type) => {
  let reducer = 'btc'
  switch (type) {
    case 'btc':
    case 'btc (sms-protected)':
    case 'btc (multisig)':
      reducer = 'btc'
      break;
    case 'eth':
      reducer = 'eth'
      break;
  }

  try {
    const currencyTxs = await Promise.all([
      actions[reducer].getTransaction(address, type),
      actions.invoices.getInvoices({
        currency: type,
        address,
      })
      // actions.btc.getInvoices(),
    ])
    pullTransactions([...currencyTxs])
    /*
    await new Promise(async resolve => {
      const ercArray = await Promise.all(Object.keys(config.erc20)
        .map(async (name, index) => {
          await delay(650 * index)
          const res = await actions.token.getTransaction(name)
          // console.log('name - ', name, '\n', '\n', res)
          return res
        }))
      return resolve(ercArray)
    }).then((ercTokens) => {
      pullTransactions([...mainTokens, ...ercTokens])
    })
    */
  } catch (error) {
    console.error('getTransError: ', error)
  }
}


export default {
  setTransactions
}
