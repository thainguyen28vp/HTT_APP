import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import Loading from '@app/components/Loading'
import { useAppDispatch } from '@app/redux/store'
import { requestUserThunk } from './App/account/slices/accountSlice'

const Test = () => {
  const dispatch = useAppDispatch()
  const renderBody = () => <Text>test</Text>
  useEffect(() => {
    dispatch(requestUserThunk())
  }, [])
  return (
    <ScreenWrapper
      titleHeader="test"
      dialogLoading={false}
      //   isLoading={true}
      unsafe
    >
      <Text>test</Text>
    </ScreenWrapper>
  )
}

export default Test
