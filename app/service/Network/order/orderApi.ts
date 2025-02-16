import { ApiClient } from '../ApiService'

export const requestGetBreed = (payload?: any) => ApiClient.get(``, payload)
export const requestGetVideos = (payload?: any) =>
  ApiClient.get(
    `videos/?key=48844599-5dc8209e38b3505a7e90d8ea9&per_page=100&q=rain+sound`,
    payload
  )
///
export const requestGetDogList = (payload: any) =>
  ApiClient.get(``, { params: payload })
