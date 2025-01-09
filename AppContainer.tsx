import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from '@app/navigation/AppNavigator'
import { RootSiblingParent } from 'react-native-root-siblings'

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <AppNavigator />
      </RootSiblingParent>
    </SafeAreaProvider>
  )
}

export default AppContainer
