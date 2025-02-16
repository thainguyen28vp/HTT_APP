// VideoPlayer.tsx
import React, { useState, useRef, useCallback, useEffect, memo } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Video, { OnLoadData, OnProgressData, VideoRef } from 'react-native-video'
import VideoControls from './VideoControls'
// import Video from 'react-native-media-console'
import { HEIGHT, WIDTH } from '@app/theme'
import reactotron from 'ReactotronConfig'

interface IProps {
  uri: string
  paused?: boolean
}

const VideoPlayer = ({ uri, paused = false }: IProps) => {
  const videoRef = useRef<VideoRef>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // const isMounted = useRef(true)

  useEffect(() => {
    // Tự động ẩn controls sau 3 giây
    if (showControls && isPlaying) {
      controlsTimer.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
    return () => {
      if (controlsTimer.current) {
        clearTimeout(controlsTimer.current)
      }
    }
  }, [showControls, isPlaying])
  useEffect(() => {
    // if (paused) {
    setIsPlaying(paused)
    if (!paused) setShowControls(true)
    // }
  }, [paused])

  const toggleControls = () => {
    if (controlsTimer.current) {
      clearTimeout(controlsTimer.current)
    }
    setShowControls(pre => !pre)
  }

  const onLoad = useCallback((data: OnLoadData) => {
    setDuration(data.duration)
    setLoading(false)
    // setCurrentTime(4)
    // videoRef.current?.seek(4)
    // }, [])}
  }, [])
  const onEnd = useCallback(() => {
    videoRef.current?.seek(0)
    setIsPlaying(false)
    setShowControls(true)
    setCurrentTime(0)
  }, [])

  const onProgress = useCallback(
    (data: OnProgressData) => {
      // if (!duration) setDuration(data.playableDuration)
      if (isPlaying) setCurrentTime(data.currentTime)
    },
    [isPlaying, duration]
  )

  const onPlayPause = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const onMutedVolume = useCallback(() => {
    setIsMuted(prev => !prev)
    // setIsFullScreen(prev => !prev)
  }, [])
  const onFullScreen = useCallback(() => {
    setIsFullScreen(prev => !prev)
  }, [])
  const onSlidingStart = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])
  const onFullscreenPlayerDidDismiss = useCallback(() => {
    setIsPlaying(true)
    videoRef.current?.resume()
    setIsFullScreen(false)
  }, [])

  const onFullscreenPlayerDidPresent = useCallback(() => {
    setIsPlaying(true)
    // setIsFullScreen(true)
  }, [])
  const onFullscreenPlayerWillPresent = useCallback(() => {
    setIsPlaying(false)
    setIsFullScreen(true)
  }, [])
  const onSlidingComplete = useCallback((value: number) => {
    videoRef.current?.seek(value)
    setIsPlaying(prev => !prev)
  }, [])
  console.log('rednder video...')
  // console.log(
  //   'rednder video...',
  //   'isPlaying',
  //   isPlaying,
  //   'isMuted',
  //   isMuted,
  //   'duration',
  //   duration,
  //   'currentTime',
  //   currentTime,
  //   'loading',
  //   loading,
  //   'showControls',
  //   showControls,
  //   'controlsTimer',
  //   controlsTimer,
  //   uri,
  //   paused
  // )

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={toggleControls}
      style={styles.container}
    >
      <Video
        ref={videoRef}
        source={{ uri: uri }}
        style={styles.video}
        paused={!isPlaying}
        onLoad={onLoad}
        onEnd={onEnd}
        onProgress={onProgress}
        resizeMode="contain"
        progressUpdateInterval={1000}
        muted={isMuted}
        fullscreen={isFullScreen}
        onFullscreenPlayerDidDismiss={onFullscreenPlayerDidDismiss}
        onFullscreenPlayerDidPresent={onFullscreenPlayerDidPresent}
        onFullscreenPlayerWillPresent={onFullscreenPlayerWillPresent}
      />
      <VideoControls
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
        onPlayPause={onPlayPause}
        onMutedVolume={onMutedVolume}
        onFullScreen={onFullScreen}
        isMuted={isMuted}
        onSlidingComplete={onSlidingComplete}
        onSlidingStart={onSlidingStart}
        loading={loading}
        showControls={showControls}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT * 0.5,
    backgroundColor: 'black',
  },
  video: {
    width: WIDTH,
    height: HEIGHT * 0.5,
  },
})

export default memo(
  VideoPlayer,
  (prev, next) => prev.uri === next.uri && prev.paused === next.paused
)
