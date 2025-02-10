import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackCardInterpolationProps,
  StackHeaderInterpolationProps,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack'
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
import { Easing } from 'react-native'

const { MAIN } = SCREEN_ROUTER

const RootStack = createStackNavigator()
const screenOptions = {
  ...TransitionPresets.ModalFadeTransition,
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
}
// const da = {
// headerShown: false,
// gestureEnabled: true,
// ...TransitionPresets.SlideFromRightIOS,
// cardStyle: { backgroundColor: 'green' },
// cardOverlayEnabled: true,
// }

const AppNavigator = () => {
  const MainApp = () => {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
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
          options={{
            gestureEnabled: false,
            presentation: 'transparentModal',
          }}
        />
        <RootStack.Screen
          name={ROOT_STACK.GLOBAL_CONFIRM}
          component={GlobalConfirm}
          options={{
            gestureEnabled: false,
            presentation: 'transparentModal',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
