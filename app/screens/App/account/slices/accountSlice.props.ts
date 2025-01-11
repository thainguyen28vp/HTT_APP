export interface IUser {
  uid?: string
  email?: string
  displayName?: string
  photoURL?: string
  emailVerified?: boolean
  phoneNumber?: string
}
export interface IAccountState {
  isLoading: boolean
  dialogLoading: boolean
  data: IUser
  error: boolean
}
