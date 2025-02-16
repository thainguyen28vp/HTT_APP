interface IVideo {
  uri: string
}
interface IControls {
  onPlayPause: () => void
  paused: boolean
  currentTime: number
  duration: number
  onSlidingComplete: (value: number) => void
  onSlidingStart: (value: number) => void
  toggleFullscreen: () => void
  isFullscreen: boolean
}
