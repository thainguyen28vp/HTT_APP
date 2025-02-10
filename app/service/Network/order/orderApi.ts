import { ApiClient } from '../ApiService'

export const requestGetBreed = (payload?: any) =>
  ApiClient.get(`v1/breeds?limit=20`, payload)
///
export const requestGetDogList = (payload: any) =>
  ApiClient.get(`v1/images/search`, { params: payload })
