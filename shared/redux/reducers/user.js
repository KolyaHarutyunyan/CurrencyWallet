export const initialState = {
  ethData: {
    address: '0x0',
    publicKey: '0x0',
    balance: 0,
    isBalanceFetched: false,
    currency: 'ETH',
    fullName: 'Ethereum',
  },
  btcData: {
    address: '0x0',
    publicKey: '0x0',
    balance: 0,
    isBalanceFetched: false,
    currency: 'BTC',
    fullName: 'Bitcoin',
  },
  nimData: {
    address: '',
    balance: 0,
    isBalanceFetched: false,
    currency: 'NIM',
    fullName: 'Nimiq',
  },
  eosData: {
    address: '',
    balance: 0,
    isBalanceFetched: true,
    currency: 'EOS',
    fullName: 'Eos',
  },
  tokensData: {},
}

export const setAuthData = (state, { name, data }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
  },
  [name]: {
    ...state[name],
    ...data,
  },
})

export const setTokenAuthData = (state, { name, data }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
    [name]: {
      ...state[name],
      ...data,
    },
  },
})

export const setBalance = (state, { name, amount, unconfirmedBalance }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
  },
  [name]: {
    ...state[name],
    balance: Number(amount),
    unconfirmedBalance,
    isBalanceFetched: true,
  },
})

export const setTokenBalance = (state, { name, amount }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
    [name]: {
      ...state.tokensData[name],
      balance: Number(amount),
      isBalanceFetched: true,
    },
  },
})

export const setTokenApprove = (state, { name, approve }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
    [name]: {
      ...state.tokensData[name],
      approve,
    },
  },
})
