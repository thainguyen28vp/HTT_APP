// VideoControls.tsx
import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import PlayPauseButton from './controls/PlayPauseButton'
import SeekBar from './controls/SeekBar'
import TimeDisplay from './controls/TimeDisplay'
import LoadingIndicator from './controls/LoadingIndicator'
import MutedVolumeButton from './controls/MutedVolumeButton'
import FullScreenButton from './controls/FullScreenButton'

const VideoControls = memo(
  ({
    isPlaying,
    duration,
    currentTime,
    onPlayPause,
    onSlidingComplete,
    onSlidingStart,
    loading,
    onMutedVolume,
    isMuted,
    showControls,
    isFullScreen,
    onFullScreen,
  }: any) => {
    console.log('rednder control...')
    if (loading) {
      return <LoadingIndicator />
    }

    return (
      <View style={styles.controls}>
        {showControls && (
          <>
            <PlayPauseButton isPlaying={isPlaying} onPress={onPlayPause} />
            <FullScreenButton
              isFullScreen={isFullScreen}
              onPress={onFullScreen}
            />
          </>
        )}

        <View style={styles.controlBottom}>
          <View style={styles.wrapperTime}>
            <TimeDisplay currentTime={currentTime} duration={duration} />
            <MutedVolumeButton isMuted={isMuted} onPress={onMutedVolume} />
          </View>
          <SeekBar
            currentTime={currentTime}
            duration={duration}
            onSlidingComplete={onSlidingComplete}
            onSlidingStart={onSlidingStart}
            containerStyle={{
              opacity: showControls ? 1 : 0,
              height: showControls ? 'auto' : 0,
            }}
          />
        </View>
      </View>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isPlaying === nextProps.isPlaying &&
      prevProps.currentTime === nextProps.currentTime &&
      // prevProps.duration === nextProps.duration &&
      prevProps.isMuted === nextProps.isMuted &&
      prevProps.loading === nextProps.loading &&
      prevProps.showControls === nextProps.showControls
    )
  }
)

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  controlBottom: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
  wrapperTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
})

export default VideoControls
