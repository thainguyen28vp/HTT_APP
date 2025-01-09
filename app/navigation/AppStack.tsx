import React from 'react'
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from '@react-navigation/stack'
import HomeScreen from '@app/screens/App/home/HomeScreen'
import { SCREEN_ROUTER_AUTH, SCREEN_ROUTER_APP } from '@app/config/screenType'
import LoginScreen from '@app/screens/Auth/login/LoginScreen'
import SplashScreen from '@app/screens/SplashScreen'
import Test from '@app/screens/Test'

const { SPLASH, LOGIN } = SCREEN_ROUTER_AUTH
const { HOME, TEST } = SCREEN_ROUTER_APP

const AUTH_STACK = {
  [SPLASH]: SplashScreen,
  [LOGIN]: LoginScreen,
}

const APP_STACK = {
  [HOME]: HomeScreen,
  [TEST]: Test,
}

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
})

const MainStack = createStackNavigator()
const AuthStack = createStackNavigator()

const StackAuthScreen = () => {
  return (
    <>
      {Object.keys(AUTH_STACK).map((item, index) => {
        if (item == SPLASH || item == LOGIN) {
          return (
            <AuthStack.Screen
              options={{
                cardStyleInterpolator: forFade,
              }}
              key={index}
              name={item}
              component={AUTH_STACK[item]}
            />
          )
        } else {
          return (
            <AuthStack.Screen
              key={index}
              name={item}
              component={AUTH_STACK[item]}
            />
          )
        }
      })}
    </>
  )
}

const StackAppScreen = () => {
  return (
    <>
      {Object.keys(APP_STACK).map((item, index) => (
        <MainStack.Screen key={index} name={item} component={APP_STACK[item]} />
      ))}
    </>
  )
}

export { StackAppScreen, StackAuthScreen, AuthStack, MainStack }
