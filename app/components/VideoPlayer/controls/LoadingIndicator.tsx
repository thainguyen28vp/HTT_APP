// controls/LoadingIndicator.tsx
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="white" />
  </View>
)

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingIndicator
