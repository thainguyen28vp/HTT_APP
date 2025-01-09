import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import Animated, {
  useSharedValue, // Quản lý giá trị có thể animate
  useAnimatedStyle, // Tạo styles động cho animation
  withSpring, // Animation kiểu lò xo
  withTiming, // Animation với thời gian
  withSequence, // Chạy nhiều animation tuần tự
  withRepeat, // Lặp lại animation
} from 'react-native-reanimated'

const AnimationExample = () => {
  // Khởi tạo các giá trị có thể animate
  const offset = useSharedValue(0) // Vị trí X
  const scale = useSharedValue(1) // Tỷ lệ scale
  const rotation = useSharedValue(0) // Góc xoay

  // Định nghĩa styles sẽ thay đổi theo giá trị animate
  const boxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value }, // Di chuyển theo trục X
        { scale: scale.value }, // Phóng to/thu nhỏ
        { rotateZ: `${rotation.value}deg` }, // Xoay
      ],
    }
  })

  // Xử lý các animation
  const handleSlide = () => {
    // Animation di chuyển với spring physics
    offset.value = withSpring(
      offset.value === 0 ? 200 : 0, // Di chuyển qua lại 200px
      {
        damping: 10, // Độ giảm chấn
        stiffness: 80, // Độ cứng của lò xo
      }
    )
  }

  const handleBounce = () => {
    // Chuỗi animation scale
    scale.value = withSequence(
      withSpring(1.2), // Phóng to
      withSpring(0.8), // Thu nhỏ
      withSpring(1) // Trở về bình thường
    )
  }

  const handleRotate = () => {
    // Animation xoay lặp lại
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000 }), // Xoay 360 độ trong 1s
      3, // Số lần lặp
      true // Reverse (quay ngược lại)
    )
  }

  return (
    <View style={styles.container}>
      {/* Box sẽ được animate */}
      <Animated.View style={[styles.box, boxStyle]} />

      {/* Các nút điều khiển */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSlide}>
          <Text style={styles.buttonText}>Slide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleBounce}>
          <Text style={styles.buttonText}>Bounce</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRotate}>
          <Text style={styles.buttonText}>Rotate</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// Styles cho component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#7B68EE',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default AnimationExample
