import globalConfig from '../server/config'
export default {
  baseUrl () {
    return `http://${globalConfig.app.host}:${globalConfig.app.apiPort}/${globalConfig.app.routerBaseApi}`
  },
  routerBaseApi () {
    let baseApi = globalConfig.app.routerBaseApi
    return baseApi
  }
}
