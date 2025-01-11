import images from '@app/assets/imagesAsset'
import { colors, WIDTH } from '@app/theme'
import LottieView from 'lottie-react-native'
import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { BarIndicator } from 'react-native-indicators'
interface Props {
  backgroundColor?: string
  translucent?: boolean
}
const Loading = ({ backgroundColor, translucent = false }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor || 'transparent',
      }}
    >
      {/* <StatusBar translucent={translucent} backgroundColor="transparent" /> */}
      <LottieView
        source={images.loadData}
        autoPlay
        loop
        style={{
          width: WIDTH * 0.25,
          aspectRatio: 1,
          backgroundColor: 'transparent',
        }}
      />
    </View>
  )
}
export default Loading
