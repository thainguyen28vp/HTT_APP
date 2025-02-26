import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import NavigationUtil from './NavigationUtil'
import { ROOT_STACK, SCREEN_ROUTER } from '@config/screenType'
import {
  AuthStack,
  MainStack,
  StackAppScreen,
  StackAuthScreen,
} from './AppStack'
import Tabs from './tab/Tabs'
import GlobalAlert from '@app/components/GlobalAlert'
import GlobalConfirm from '@app/components/GlobalConfirm'
import { Easing, Platform } from 'react-native'

const { MAIN } = SCREEN_ROUTER

const RootStack = createNativeStackNavigator()
const screenOptions: NativeStackNavigationOptions = {
  animation: 'fade',
  headerShown: false,
}
const optionsModal: NativeStackNavigationOptions = {
  gestureEnabled: false,
  presentation: 'transparentModal',
  contentStyle: { backgroundColor: 'rgba(0,0,0,0.5)' },
}

const AppNavigator = () => {
  const MainApp = () => {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {StackAuthScreen()}
        <MainStack.Screen name={MAIN} component={Tabs} />
        {StackAppScreen()}
      </AuthStack.Navigator>
    )
  }
  return (
    <NavigationContainer
      ref={navigatorRef => {
        if (navigatorRef) NavigationUtil.setTopLevelNavigator(navigatorRef)
      }}
    >
      <RootStack.Navigator
        screenOptions={screenOptions}
        initialRouteName={ROOT_STACK.MAIN_APP}
      >
        <RootStack.Screen name={ROOT_STACK.MAIN_APP} component={MainApp} />
        <RootStack.Screen
          name={ROOT_STACK.GLOBAL_ALERT}
          component={GlobalAlert}
          options={optionsModal}
        />
        <RootStack.Screen
          name={ROOT_STACK.GLOBAL_CONFIRM}
          component={GlobalConfirm}
          options={optionsModal}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
