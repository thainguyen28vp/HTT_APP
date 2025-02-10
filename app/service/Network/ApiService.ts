import R from '@app/assets/R'
import { showMessages } from '@app/utils/GlobalAlertHelper'
import AsyncStoreService from '../AsyncStorage/AsyncStorageService'
import { BASE_REQUEST } from '@app/config/constants'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER_AUTH } from '@app/config/screenType'

interface ResponseType<T> {
  status: number
  code: number
  message: string
  data: any
}

const createAPI = () => {
  const APIInstant = require('axios').default.create()
  APIInstant.defaults.baseURL = BASE_REQUEST
  APIInstant.defaults.timeout = 20000
  // APIInstant.defaults.headers = { 'Content-Type': 'application/json' }
  APIInstant.interceptors.request.use(async (config: any) => {
    config.headers['YOUR-API-KEY'] =
      'live_3qsatccN20sGL0kryQe7XfBO05aHK7SQfQ8H7Cgsj11nI5f0fbegO6QTn7RSLdIT'
    // config.headers.platform = 'app'
    return config
  }, Promise.reject)

  APIInstant.interceptors.response.use((response: ResponseType<any>) => {
    const data = response?.data
    if (!data) {
      showMessages(R.strings().noti, 'dang nhap lai', () => {
        AsyncStoreService.putToken('').then(() => {})
        NavigationUtil.navigate(SCREEN_ROUTER_AUTH.SPLASH, { re_login: true })
      })
    }

    return response
  })
  return APIInstant
}

const axiosClient = createAPI()

/* Support function */
function handleResult<T>(api: any) {
  // if (NetworkHelper.isInternetReachable) {
  return api.then((res: any) => {
    return handleResponse<T>(res.data)
  })
  // } else Promise.reject(new Error('Network offline'));
}

function handleResponse<T>(data: ResponseType<T>) {
  // if (data.status !== 1)

  //   return Promise.reject(new Error(data?.message || 'Co loi xay ra'))
  return Promise.resolve(data)
}

export const ApiClient = {
  get: (url: string, payload?: any) =>
    handleResult(axiosClient.get(url, payload)),
  post: (url: string, payload?: any) =>
    handleResult(axiosClient.post(url, payload)),
  put: (url: string, payload?: any) =>
    handleResult(axiosClient.put(url, payload)),
  path: (url: string, payload?: any) =>
    handleResult(axiosClient.patch(url, payload)),
  delete: (url: string, payload?: any) =>
    handleResult(axiosClient.delete(url, payload)),
}
