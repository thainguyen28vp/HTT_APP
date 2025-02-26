import React, { useCallback } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HEIGHT, OS, WIDTH } from '@app/theme'
import { IDraggable } from './Draggable.props'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const EDGE_MARGIN = 16 // Khoảng cách từ cạnh

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 0.5,
}

const DraggableView = ({
  size = 60,
  color = '#2196F3',
  children,
}: IDraggable) => {
  const insets = useSafeAreaInsets()

  // Tính toán vị trí ban đầu (cách cạnh trái 16px)
  const initialX = WIDTH - EDGE_MARGIN - size
  const initialY = HEIGHT - EDGE_MARGIN - size - insets.bottom - 80

  // Animated values
  const translateX = useSharedValue(initialX)
  const translateY = useSharedValue(initialY)
  const scale = useSharedValue(1)
  const lastX = useSharedValue(initialX)
  const lastY = useSharedValue(initialY)

  const clamp = useCallback((value: number, min: number, max: number) => {
    'worklet'
    return Math.min(Math.max(value, min), max)
  }, [])

  // Cập nhật calculateSnapPosition với EDGE_MARGIN
  const calculateSnapPosition = useCallback(
    (x: number, y: number) => {
      'worklet'
      const shouldSnapLeft = x < (SCREEN_WIDTH - insets.left - insets.right) / 2

      const targetX = shouldSnapLeft
        ? insets.left + EDGE_MARGIN // Snap trái + margin
        : SCREEN_WIDTH - insets.right - size - EDGE_MARGIN // Snap phải - margin

      const clampedY = clamp(
        y,
        insets.top + EDGE_MARGIN, // Top + margin
        SCREEN_HEIGHT - insets.bottom - size - EDGE_MARGIN // Bottom - margin
      )

      return {
        x: targetX,
        y: clampedY,
      }
    },
    [size, insets]
  )

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.1, { damping: 15 })
    })
    .onUpdate(event => {
      // Giới hạn trong vùng an toàn + margin
      translateX.value = clamp(
        lastX.value + event.translationX,
        insets.left + EDGE_MARGIN,
        SCREEN_WIDTH - insets.right - size - EDGE_MARGIN
      )

      translateY.value = clamp(
        lastY.value + event.translationY,
        insets.top + EDGE_MARGIN,
        SCREEN_HEIGHT - insets.bottom - size - EDGE_MARGIN - 80
        // : SCREEN_HEIGHT - insets.bottom - size - EDGE_MARGIN
      )
    })
    .onFinalize(() => {
      const snapPosition = calculateSnapPosition(
        translateX.value,
        translateY.value
      )

      translateX.value = withSpring(snapPosition.x, SPRING_CONFIG)
      translateY.value = withSpring(snapPosition.y, SPRING_CONFIG)
      scale.value = withSpring(1, { damping: 15 })

      lastX.value = snapPosition.x
      lastY.value = snapPosition.y
    })

  // Double tap để reset về vị trí ban đầu
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      translateX.value = withSpring(initialX, SPRING_CONFIG)
      translateY.value = withSpring(insets.top + EDGE_MARGIN, SPRING_CONFIG)
      lastX.value = initialX
      lastY.value = insets.top + EDGE_MARGIN
    })

  const composedGestures = Gesture.Simultaneous(gesture, doubleTapGesture)

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    }
  })

  return (
    <GestureDetector gesture={composedGestures}>
      <Animated.View
        style={[
          styles.box,
          { width: size, height: size, backgroundColor: color, zIndex: 10 },
          rStyle,
        ]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 30,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

// Sử dụng component

export default DraggableView
