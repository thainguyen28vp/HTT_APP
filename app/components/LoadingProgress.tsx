import { colors, WIDTH } from '@app/theme'
import R from '@R'
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import images from '@app/assets/imagesAsset'

export default class LoadingProgress extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LottieView
          loop
          autoPlay
          source={images.lottieLoading}
          style={styles.lottieLoading}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    elevation: Platform.OS == 'android' ? 4 : 0,
  },
  containerLoading: {
    height: 140,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
  },
  lottieLoading: {
    width: WIDTH * 0.35,
    // height: 130,
    aspectRatio: 1,
  },
})
