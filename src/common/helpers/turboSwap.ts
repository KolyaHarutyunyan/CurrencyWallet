// temporarily: no tokens support at the turboswaps-alpha
// see https://github.com/swaponline/MultiCurrencyWallet/issues/3875

const supportedAssets = ['btc', 'eth', 'ghost', 'next']

const isAssetSupported = (asset: string) => supportedAssets.includes(asset.toLowerCase())

export default {
  isAssetSupported
}