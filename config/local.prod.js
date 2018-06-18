import baseConfig from './default'
import config from './_testnet'


export default {
  env: 'production',
  entry: 'local',

  base: `http://localhost:${baseConfig.http.port}/`,
  publicPath: `http://localhost:${baseConfig.http.port}${baseConfig.publicPath}`,

  ...config,
}