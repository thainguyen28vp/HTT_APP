// controls/PlayPauseButton.tsx
import images from '@app/assets/imagesAsset'
import FastImage from '@d11/react-native-fast-image'
import React, { memo } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

interface IProps {
  isPlaying: boolean
  onPress: () => void
}

const PlayPauseButton = memo(({ isPlaying, onPress }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FastImage
        source={isPlaying ? images.ic_pause : images.ic_play}
        style={{ width: 32, aspectRatio: 1 }}
        tintColor="white"
      />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: 12,
    borderRadius: 100,
  },
})

export default PlayPauseButton
