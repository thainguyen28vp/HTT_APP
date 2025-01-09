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

const ButtonCustom = ({ onPress, ...props }: TouchableOpacityProps) => {
  const scale = useSharedValue(1)
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
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      onPress={onPressAction}
      onPressIn={() => {
        scale.value = withTiming(0.95, { duration: 150 })
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 150 })
      }}
      children={
        <Animated.View style={[animatedStyle]}>{props.children}</Animated.View>
      }
    />
  )
}
export default memo(ButtonCustom)
