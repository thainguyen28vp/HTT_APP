import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from '@app/navigation/AppNavigator'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Provider } from 'react-redux'
import store from '@app/redux/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Provider store={store}>
              <AppNavigator />
            </Provider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </RootSiblingParent>
    </SafeAreaProvider>
  )
}

export default AppContainer
