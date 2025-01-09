import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackCardInterpolationProps,
  StackHeaderInterpolationProps,
  TransitionPresets,
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

const { MAIN } = SCREEN_ROUTER

const RootStack = createStackNavigator()
const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({
    current: { progress },
  }: StackHeaderInterpolationProps & any) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
}

const MainApp = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName={MAIN}
    >
      {StackAuthScreen()}
      <MainStack.Screen name={MAIN} component={Tabs} />
      {StackAppScreen()}
    </AuthStack.Navigator>
  )
}
const AppNavigator = () => {
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
