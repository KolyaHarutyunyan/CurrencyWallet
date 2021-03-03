import api from './api'


export default {
  BTC: {
    withdrawTransactionHash: `utxoSwapWithdrawTransactionHash`,
    scriptCreatingTransactionHash: `utxoScriptCreatingTransactionHash`,
    explorerLink: api.blockcypher,
    verifyScriptFunc: `verifyScript`,
    scriptValues: `utxoScriptValues`, // @to-do - remove this - use in code utxoScriptValues
  },
  NEXT: {
    withdrawTransactionHash: `utxoSwapWithdrawTransactionHash`,
    scriptCreatingTransactionHash: `utxoScriptCreatingTransactionHash`,
    explorerLink: api.nextscan,
    verifyScriptFunc: `verifyScript`,
    scriptValues: `utxoScriptValues`,
  },
  GHOST: {
    withdrawTransactionHash: `utxoSwapWithdrawTransactionHash`,
    scriptCreatingTransactionHash: `utxoScriptCreatingTransactionHash`,
    explorerLink: api.ghostscan,
    verifyScriptFunc: `verifyScript`,
    scriptValues: `utxoScriptValues`,
  },
}