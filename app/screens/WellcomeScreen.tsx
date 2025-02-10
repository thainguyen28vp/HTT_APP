import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { SceneMap, TabView } from 'react-native-tab-view'
import { WIDTH } from '@app/theme'
import { SCREEN_ROUTER, SCREEN_ROUTER_APP } from '@app/config/screenType'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import images from '@app/assets/imagesAsset'
import LottieView from 'lottie-react-native'
import ButtonCustom from '@app/components/ButtonCustom'
import ScreenWrapper from '@app/components/ScreenWrapper'

const routes = [
  { key: 'one', title: '' },
  { key: 'two', title: '' },
  { key: 'three', title: '' },
]
const WellcomeScreen = (props: any) => {
  const [index, setIndex] = useState(0)
  const ScreenOne = () => {
    return (
      <View style={styles.tab}>
        <LottieView
          autoPlay
          source={images.wellcome1}
          style={styles.lottieImg}
          loop
        />
      </View>
    )
  }
  const ScreenTwo = () => {
    return (
      <View style={styles.tab}>
        <LottieView
          autoPlay
          source={images.wellcome2}
          loop
          style={styles.lottieImg}
        />
      </View>
    )
  }
  const ScreenThree = () => {
    return (
      <View style={styles.tab}>
        <LottieView
          autoPlay
          source={images.wellcome3}
          style={styles.lottieImg}
          loop
        />
      </View>
    )
  }
  const renderScene = SceneMap({
    one: ScreenOne,
    two: ScreenTwo,
    three: ScreenThree,
  })
  const renderTabBar = () => <></>
  const goToHome = async () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: SCREEN_ROUTER.MAIN }],
    })
    await AsyncStorageService.saveString('is_login', '1')
  }
  return (
    <ScreenWrapper styles={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: WIDTH }}
        lazy
      />
      <Image source={images.img_wellcome} style={styles.img_wellcome} />

      <ButtonCustom onPress={goToHome} style={styles.btnCancle}>
        <Text style={styles.txtCancle}>Bỏ qua</Text>
      </ButtonCustom>
      <TouchableOpacity
        onPress={goToHome}
        disabled={index != 2}
        style={[styles.btnStart, index != 2 && { opacity: 0 }]}
      >
        <Text style={styles.txtStart}>Bắt đầu</Text>
      </TouchableOpacity>
      <View style={styles.wrapperNextPage}>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            return (
              <View
                key={i}
                style={[
                  styles.dot,
                  { backgroundColor: index === i ? '#F1A12A' : '#A5A7AB' },
                ]}
              />
            )
          })}
      </View>
    </ScreenWrapper>
  )
}

export default WellcomeScreen

const styles = StyleSheet.create({
  wrapperNextPage: {
    position: 'absolute',
    bottom: '6%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
    gap: 16,
  },
  dot: {
    width: 8,
    aspectRatio: 1,
    borderRadius: 6,
  },
  txtStart: {
    color: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#F1A12A',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnCancle: {
    position: 'absolute',
    top: '8%',
    right: 16,
  },
  btnStart: {
    bottom: '15%',
    right: 16,
    position: 'absolute',
  },
  txtCancle: {
    color: 'black',
    fontSize: 16,
  },
  img_wellcome: {
    width: WIDTH,
    height: 80,
    position: 'absolute',
    top: '12%',
  },
  tab: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieImg: {
    width: WIDTH * 0.75,
    aspectRatio: 1,
  },
})
