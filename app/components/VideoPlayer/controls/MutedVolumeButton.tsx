// controls/PlayPauseButton.tsx
import images from '@app/assets/imagesAsset'
import FastImage from '@d11/react-native-fast-image'
import React, { memo } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

interface IProps {
  isMuted: boolean
  onPress: () => void
}

const MutedVolumeButton = memo(({ isMuted, onPress }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FastImage
        source={!isMuted ? images.ic_volume : images.ic_muted}
        style={{ width: 24, aspectRatio: 1 }}
        tintColor="white"
      />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  button: {
    padding: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 100,
  },
})

export default MutedVolumeButton
