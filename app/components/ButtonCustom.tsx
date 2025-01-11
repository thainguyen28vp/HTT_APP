import React, { memo } from 'react'
import {
  ButtonProps,
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { debounce } from 'lodash'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const ButtonCustom = ({ onPress, style, ...props }: TouchableOpacityProps) => {
  const scale = useSharedValue(1)
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity)

  const debouncedOnPress = (e: GestureResponderEvent) => {
    onPress && onPress(e)
  }
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))
  const onPressAction = debounce(debouncedOnPress, 300, {
    leading: true,
    trailing: false,
  })

  return (
    <AnimatedTouchableOpacity
      style={[style, animatedStyle]}
      activeOpacity={0.8}
      {...props}
      onPress={onPressAction}
      onPressIn={() => {
        scale.value = withTiming(0.98, { duration: 150 })
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 150 })
      }}
      children={props.children}
    />
  )
}
export default memo(ButtonCustom)
