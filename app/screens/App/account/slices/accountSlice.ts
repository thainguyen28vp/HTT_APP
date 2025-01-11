import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth'
import { IAccountState, IUser } from './accountSlice.props'

const initialState: IAccountState = {
  isLoading: false,
  dialogLoading: false,
  data: {},
  error: false,
}
export const requestUserThunk = createAsyncThunk(
  'account/requestUserThunk',
  async () => {
    const user = await auth().currentUser
    return {
      uid: user?.uid,
      email: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      emailVerified: user?.emailVerified,
      phoneNumber: user?.phoneNumber,
    }
  }
)
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearDataInfo: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(requestUserThunk.pending, state => {
      state.isLoading = true
    })
    builder.addCase(requestUserThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload as IUser
    })
    builder.addCase(requestUserThunk.rejected, state => {
      state.isLoading = false
      state.error = true
    })
  },
})
export const { clearDataInfo } = accountSlice.actions
export default accountSlice.reducer
