import { configureStore } from '@reduxjs/toolkit'
import reactotron from '../../ReactotronConfig'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import rootReducer from './rootReducer'

const reduxEnhancer = __DEV__ ? [reactotron.createEnhancer!()] : []

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  enhancers: reduxEnhancer,
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
