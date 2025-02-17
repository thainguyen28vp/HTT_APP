import { ApiClient } from '../ApiService'

export const requestGetBreed = (payload?: any) => ApiClient.get(``, payload)
export const requestGetVideos = (payload?: any) =>
  ApiClient.get(`videos`, { params: payload })
///
export const requestGetDogList = (payload: any) =>
  ApiClient.get(``, { params: payload })
