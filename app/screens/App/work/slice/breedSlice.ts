import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth'
import { requestGetBreed } from '@app/service/Network/order/orderApi'

interface IBreed {
  isLoading: boolean
  dialogLoading: boolean
  data: any
  error: boolean
}

const initialState: IBreed = {
  isLoading: false,
  dialogLoading: false,
  data: {},
  error: false,
}
export const requestBreedThunk = createAsyncThunk(
  'order/requestBreedThunk',
  async () => {
    const breed = await requestGetBreed()
    return breed
  }
)
const breedSlice = createSlice({
  name: 'breed',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(requestBreedThunk.pending, state => {
      //   state.isLoading = true
    })
    builder.addCase(requestBreedThunk.fulfilled, (state, action) => {
      //   state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(requestBreedThunk.rejected, state => {
      //   state.isLoading = false
      //   state.error = true
    })
  },
})
export const {} = breedSlice.actions
export default breedSlice.reducer
