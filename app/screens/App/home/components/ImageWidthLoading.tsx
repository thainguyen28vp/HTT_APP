import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState, memo } from 'react'
import FastImage from '@d11/react-native-fast-image'

interface IProps {
  imageUrl: string
}

const ImageWithLoading = ({ imageUrl }: IProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: imageUrl,
          priority: FastImage.priority.normal,
        }}
        resizeMode="cover"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={'#F1A12A'} />
        </View>
      )}
    </View>
  )
}

export default memo(ImageWithLoading)

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
})
