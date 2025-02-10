import accountSlice from '@app/screens/App/account/slices/accountSlice'
import breedSlice from '@app/screens/App/work/slice/breedSlice'

const rootReducer = {
  accountReducer: accountSlice,
  breedReducer: breedSlice,
}
export default rootReducer
