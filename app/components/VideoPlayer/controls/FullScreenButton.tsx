// controls/PlayPauseButton.tsx
import images from '@app/assets/imagesAsset'
import FastImage from '@d11/react-native-fast-image'
import React, { memo } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

interface IProps {
  isFullScreen: boolean
  onPress: () => void
}

const FullScreenButton = memo(({ isFullScreen, onPress }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FastImage
        source={!isFullScreen ? images.ic_enlarge : images.ic_zoom_out}
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
    right: 0,
    top: 0,
  },
})

export default FullScreenButton
