import React from 'react'
import {
  createStackNavigator,
  StackCardInterpolationProps,
  TransitionSpecs,
} from '@react-navigation/stack'
import HomeScreen from '@app/screens/App/home/HomeScreen'
import { SCREEN_ROUTER_AUTH, SCREEN_ROUTER_APP } from '@app/config/screenType'
import LoginScreen from '@app/screens/Auth/login/LoginScreen'
import SplashScreen from '@app/screens/SplashScreen'
import Test from '@app/screens/Test'
import RegisterScreen from '@app/screens/Auth/register/RegisterScreen'
import AccountInfoScreen from '@app/screens/App/account/AccountInfoScreen'
import ChangePasswordScreen from '@app/screens/App/account/ChangePasswordScreen'
import GardenInfoScreen from '@app/screens/App/account/GardenInfoScreen'
import GardenStaffListScreen from '@app/screens/App/account/GardenStaffListScreen'
import WorkScreen from '@app/screens/App/work/WorkScreen'
import WellcomeScreen from '@app/screens/WellcomeScreen'
import CropInfoScreen from '@app/screens/App/cropInfo/CropInfoScreen'
import WorkDetails from '@app/screens/App/work/WorkDetails'

const { SPLASH, LOGIN, REGISTER, WELLCOME } = SCREEN_ROUTER_AUTH
const {
  HOME,
  TEST,
  UPDATE_INFO,
  CHANGE_PASSWORD,
  GARDEN_INFO,
  GARDEN_STAFF,
  CROP_INFO,
  WORK,
  WORK_DETAILS,
} = SCREEN_ROUTER_APP

const AUTH_STACK = {
  [SPLASH]: SplashScreen,
  [WELLCOME]: WellcomeScreen,
  [LOGIN]: LoginScreen,
  [REGISTER]: RegisterScreen,
}

const APP_STACK = {
  [HOME]: HomeScreen,
  [WORK]: WorkScreen,
  [TEST]: Test,
  [UPDATE_INFO]: AccountInfoScreen,
  [CHANGE_PASSWORD]: ChangePasswordScreen,
  [GARDEN_STAFF]: GardenStaffListScreen,
  [GARDEN_INFO]: GardenInfoScreen,
  [CROP_INFO]: CropInfoScreen,
  [WORK_DETAILS]: WorkDetails,
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
        if (item == SPLASH || item == LOGIN || item == WELLCOME) {
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
