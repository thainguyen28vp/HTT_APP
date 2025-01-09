import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import {
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
  SCREEN_ROUTER_AUTH,
} from '@app/config/screenType'
import FastImage from '@d11/react-native-fast-image'
import R from '@R'

const SplashScreen = (props: any) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{ name: SCREEN_ROUTER_AUTH.LOGIN }],
        // routes: [{ name: SCREEN_ROUTER_APP.TEST }],
        // routes: [{ name: SCREEN_ROUTER.MAIN }],
      })
    }, 1000)
  }, [])
  return (
    <SafeAreaView style={styles.flex}>
      <FastImage source={R.images.logo} style={styles.logo} />
    </SafeAreaView>
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
