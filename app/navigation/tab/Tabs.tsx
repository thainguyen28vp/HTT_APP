import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import R from '@R'
import { TabBarOption } from './tab.props'
import {
  MAIN_TAB,
  ROOT_STACK,
  SCREEN_ROUTER_AUTH,
} from '@app/config/screenType'
import HomeScreen from '@app/screens/App/home/HomeScreen'
import WorkScreen from '@app/screens/App/work/WorkScreen'
import AccountScreen from '@app/screens/App/account/AccountScreen'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import styles from './styles'
import FastImage from '@d11/react-native-fast-image'
import { showConfirm } from '@app/utils/GlobalAlertHelper'
import NavigationUtil from '../NavigationUtil'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'

const { HOME, ACCOUNT, WORK } = MAIN_TAB

export const TAB_BAR: Record<string, TabBarOption> = {
  [HOME]: {
    name: MAIN_TAB.HOME,
    icon: R.images.ic_home,
    route: HomeScreen,
    title: R.strings().home,
  },
  [WORK]: {
    name: MAIN_TAB.WORK,
    icon: R.images.ic_work,
    route: WorkScreen,
    title: R.strings().work,
  },
  [ACCOUNT]: {
    name: MAIN_TAB.ACCOUNT,
    icon: R.images.ic_account,
    route: AccountScreen,
    title: R.strings().account,
  },
}

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? '#F68C20' : '#A5A7AB'
          return (
            <FastImage
              style={styles.img_icon}
              tintColor={tintColor}
              source={TAB_BAR[route.name].icon}
              resizeMode={'contain'}
            />
          )
        },
        tabBarLabel: ({ focused }) => {
          const tintColor = focused ? '#F68C20' : '#A5A7AB'
          return (
            <Text
              style={[
                styles.txtLabel,
                {
                  color: tintColor,
                },
              ]}
              numberOfLines={1}
            >
              {TAB_BAR[route.name].title}
            </Text>
          )
        },
        tabBarButton: props => {
          return (
            <TouchableOpacity
              {...(props as TouchableOpacityProps)}
              onPress={async e => {
                const token = await AsyncStorageService.getToken()
                if (route.name != MAIN_TAB.HOME && !token) {
                  showConfirm(
                    R.strings().noti,
                    R.strings().require_login_message,
                    () => {
                      NavigationUtil.navigate(SCREEN_ROUTER_AUTH.LOGIN)
                    },
                    R.strings().login,
                    ''
                  )
                  return
                }
                if (props.onPress) props.onPress(e)
              }}
            />
          )
        },
      })}
    >
      {Object.keys(TAB_BAR).map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={TAB_BAR[item].name}
            component={TAB_BAR[item].route}
          />
        )
      })}
    </Tab.Navigator>
  )
}

export default Tabs
