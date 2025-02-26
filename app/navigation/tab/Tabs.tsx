import React from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
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
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import FastImage from '@d11/react-native-fast-image'
import { showConfirm } from '@app/utils/GlobalAlertHelper'
import NavigationUtil from '../NavigationUtil'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { useTheme } from '@app/context/ThemeContext'
import HarvestScreen from '@app/screens/App/harvest/HarvestScreen'
import QrScanScreen from '@app/screens/App/qrScanScreens.tsx/QrScanScreen'
import { WIDTH } from '@app/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'
import images from '@app/assets/imagesAsset'

const { HOME, ACCOUNT, WORK, HAVEST, QR_SCAN } = MAIN_TAB

export const TAB_BAR: Record<string, TabBarOption> = {
  [HAVEST]: {
    name: MAIN_TAB.HAVEST,
    icon: R.images.ic_harvest,
    route: HarvestScreen,
    title: R.strings().harvest,
  },
  [HOME]: {
    name: MAIN_TAB.HOME,
    icon: R.images.ic_home,
    route: HomeScreen,
    title: R.strings().home,
  },
  [QR_SCAN]: {
    name: MAIN_TAB.QR_SCAN,
    icon: R.images.qrScan,
    route: QrScanScreen,
    title: '',
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
  const { theme } = useTheme()
  const inset = useSafeAreaInsets()
  const TabbarCustom = ({ state, navigation }: BottomTabBarProps) => {
    return (
      <View style={[styles.wrapperTab, { paddingBottom: inset.bottom }]}>
        {state.routes.map((tab, index) => {
          const isFocused = state.index === index
          const color = isFocused ? '#F1A12A' : '#A5A7AB'
          const onPressTab = async () => {
            const token = await AsyncStorageService.getToken()
            if (tab.name != MAIN_TAB.HAVEST && !token) {
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
            const event = navigation.emit({
              type: 'tabPress',
              target: tab.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(tab.name)
            }
          }

          if (tab.name === MAIN_TAB.QR_SCAN) {
            return (
              <TouchableOpacity
                onPress={onPressTab}
                style={styles.tab}
                key={tab.key}
              >
                <LottieView
                  style={{ width: 50, height: 50 }}
                  source={images.qrScan}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            )
          }
          return (
            <TouchableOpacity
              onPress={() => onPressTab()}
              style={styles.tab}
              key={tab.key}
            >
              <FastImage
                tintColor={color}
                source={TAB_BAR[tab.name].icon}
                style={styles.icon}
              />
              <Text style={[styles.label, { color }]}>
                {TAB_BAR[tab.name].title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  return (
    <Tab.Navigator
      tabBar={props => <TabbarCustom {...props} />}
      screenOptions={({ navigation, route }) => ({
        headerShown: false,

        tabBarStyle: { backgroundColor: theme.colors.background },

        // tabBarIcon: ({ focused }) => {
        //   const tintColor = focused ? '#F68C20' : '#A5A7AB'
        //   return (
        //     <FastImage
        //       style={styles.img_icon}
        //       tintColor={tintColor}
        //       source={TAB_BAR[route.name].icon}
        //       resizeMode={'contain'}
        //     />
        //   )
        // },
        // tabBarLabel: ({ focused }) => {
        //   const tintColor = focused ? '#F68C20' : '#A5A7AB'
        //   return (
        //     <Text
        //       style={[
        //         styles.txtLabel,
        //         {
        //           color: tintColor,
        //         },
        //       ]}
        //       numberOfLines={1}
        //     >
        //       {TAB_BAR[route.name].title}
        //     </Text>
        //   )
        // },
        // tabBarButton: props => {
        //   return (
        //     <TouchableOpacity
        //       {...(props as TouchableOpacityProps)}
        //       onPress={async e => {
        //         const token = await AsyncStorageService.getToken()
        //         if (route.name != MAIN_TAB.HOME && !token) {
        //           showConfirm(
        //             R.strings().noti,
        //             R.strings().require_login_message,
        //             () => {
        //               NavigationUtil.navigate(SCREEN_ROUTER_AUTH.LOGIN)
        //             },
        //             R.strings().login,
        //             ''
        //           )
        //           return
        //         }
        //         if (props.onPress) props.onPress(e)
        //       }}
        //     />
        //   )
        // },
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

const styles = StyleSheet.create({
  wrapperTab: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
  },
})

export default Tabs
