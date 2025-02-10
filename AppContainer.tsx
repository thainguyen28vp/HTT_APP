import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from '@app/navigation/AppNavigator'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Provider } from 'react-redux'
import store from '@app/redux/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <GestureHandlerRootView>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </GestureHandlerRootView>
      </RootSiblingParent>
    </SafeAreaProvider>
  )
}

export default AppContainer
