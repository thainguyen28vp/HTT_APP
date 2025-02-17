import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from '@app/navigation/AppNavigator'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Provider } from 'react-redux'
import store from '@app/redux/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PaperProvider } from 'react-native-paper'
import { ThemeProvider } from '@app/context/ThemeContext'

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <Provider store={store}>
            <PaperProvider>
              <BottomSheetModalProvider>
                <RootSiblingParent>
                  <AppNavigator />
                </RootSiblingParent>
              </BottomSheetModalProvider>
            </PaperProvider>
          </Provider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default AppContainer
