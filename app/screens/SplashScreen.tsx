import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import {
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
  SCREEN_ROUTER_AUTH,
} from '@app/config/screenType'
import FastImage from '@d11/react-native-fast-image'
import R from '@R'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import ScreenWrapper from '@app/components/ScreenWrapper'

const SplashScreen = (props: any) => {
  useEffect(() => {
    setTimeout(() => {
      checkLogin()
    }, 1000)
  }, [])
  const checkLogin = async () => {
    const [token, is_login] = await Promise.all([
      AsyncStorageService.getToken(),
      AsyncStorageService.load('is_login'),
    ])
    if (!token) {
      if (!Number(is_login)) {
        props.navigation.reset({
          index: 0,
          routes: [{ name: SCREEN_ROUTER_AUTH.WELLCOME }],
        })
      } else
        props.navigation.reset({
          index: 0,
          routes: [{ name: SCREEN_ROUTER_AUTH.LOGIN }],
          // routes: [{ name: SCREEN_ROUTER_APP.TEST }],
          // routes: [{ name: SCREEN_ROUTER.MAIN }],
        })
    } else {
      props.navigation.reset({
        index: 0,
        // routes: [{ name: SCREEN_ROUTER_AUTH.LOGIN }],
        // routes: [{ name: SCREEN_ROUTER_APP.TEST }],
        routes: [{ name: SCREEN_ROUTER.MAIN }],
      })
    }
  }

  return (
    <ScreenWrapper styles={styles.flex}>
      <FastImage source={R.images.logo} style={styles.logo} />
    </ScreenWrapper>
  )
}
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    aspectRatio: 1,
  },
})
export default SplashScreen
