// controls/TimeDisplay.tsx
import React, { memo } from 'react'
import { Text, StyleSheet } from 'react-native'

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

interface IProps {
  currentTime: number
  duration: number
}

const TimeDisplay = memo(({ currentTime, duration }: IProps) => {
  return (
    <Text style={styles.text}>
      {formatTime(currentTime)} / {formatTime(duration)}
    </Text>
  )
})

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 12,
  },
})

export default TimeDisplay
