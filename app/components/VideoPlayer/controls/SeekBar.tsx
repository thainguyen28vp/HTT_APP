// controls/SeekBar.tsx
import React, { memo } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import Slider from '@react-native-community/slider'

interface IProps {
  currentTime: number
  duration: number
  onSlidingComplete: () => void
  onSlidingStart: () => void
  containerStyle?: StyleProp<ViewStyle>
}

const SeekBar = ({
  currentTime,
  duration,
  onSlidingComplete,
  onSlidingStart,
  containerStyle,
}: IProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Slider
        value={currentTime}
        maximumValue={duration}
        minimumValue={0}
        onSlidingComplete={onSlidingComplete}
        onSlidingStart={onSlidingStart}
        minimumTrackTintColor="#F1A12A"
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor="#FFFFFF"
        style={styles.slider}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  slider: {
    width: '100%',
  },
})

export default memo(SeekBar)
