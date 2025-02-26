import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { callAPIHook } from '@app/utils/CallApiHelper'
import { requestGetVideos } from '@app/service/Network/order/orderApi'
import PostForm from './components/PostForm'
import ScreenWrapper from '@app/components/ScreenWrapper'
import BottomSheetCustom from '@app/components/BottomSheetCustom'
import BottomSheet from '@gorhom/bottom-sheet'
import { Portal } from 'react-native-paper'
import RNFS from 'react-native-fs'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import Toast from 'react-native-root-toast'
import { OS } from '@app/theme'
import { requestPermissionWriteLibrary } from '@app/utils/AppPermissions'
import reactotron from 'ReactotronConfig'

interface Video {
  url: string
  id: string
  userImageURL: string
  user: string
  likes: string | number
  comments: string | number
}

interface VideoResponse {
  hits: Array<{
    id: string
    videos: {
      tiny: {
        url: string
      }
    }
    userImageURL: string
    user: string
    likes: string | number
    comments: string | number
  }>
}
const PER_PAGE = 10

const viewabilityConfig = {
  itemVisiblePercentThreshold: 50, // Khi 50% item hiển thị trên màn hình
  waitForInteraction: true,
}

const HomeScreen = () => {
  const [loading, setLoading] = useState(false)
  const [loadingDialog, setLoadingDialog] = useState(false)
  const [videoActive, setVideoActive] = useState<Video | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const isTabActive = useIsFocused()
  const [page, setPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)

  const processVideoData = useCallback((data: VideoResponse['hits']) => {
    return data.map(({ videos, id, userImageURL, user, likes, comments }) => ({
      url: videos.tiny.url,
      userImageURL,
      user,
      likes,
      comments,
      id,
    }))
  }, [])

  const fetchVideos = useCallback(async () => {
    reactotron.log('dddddddddaaaaaaaa', page)

    if (!hasMoreData) {
      return
    }
    callAPIHook({
      API: requestGetVideos,
      payload: {
        per_page: PER_PAGE,
        page,
      },
      useLoading: page === 1 ? setIsRefreshing : undefined,
      onSuccess: (res: VideoResponse) => {
        const processedVideos = processVideoData(res.hits)

        if (page === 1) {
          setVideos(processedVideos)
          if (processedVideos.length > 0) {
            setCurrentVideoId(processedVideos[0].id)
          }
        } else {
          setVideos(prev => [...prev, ...processedVideos])
        }
        if (processedVideos.length < PER_PAGE) setHasMoreData(false)
      },
      onError: err => console.log('err', err),
      onFinaly: () => {
        page === 1 && setIsRefreshing(false)
      },
    })
  }, [page, hasMoreData])

  useEffect(() => {
    fetchVideos()
    // return () => setCurrentVideoId(null)
  }, [page])

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const primaryVisibleItem = viewableItems.find(
          item => item.isViewable && item.item?.id
        )
        setCurrentVideoId(primaryVisibleItem?.item.id || null)
      }
    },
    []
  )

  const onShowBottomSheet = (item: Video) => {
    setVideoActive(item)
    bottomSheetRef.current?.expand()
  }
  const saveVideo = () => {
    bottomSheetRef.current?.close()

    requestPermissionWriteLibrary().then(res => {
      if (res) {
        handleDownloadVideo()
      }
    })
  }
  const handleDownloadVideo = async () => {
    try {
      if (!videoActive) {
        Toast.show('Có lỗi xảy ra!')
        return
      }
      setLoadingDialog(true)

      // Tạo đường dẫn file
      const fileName = `video_${Date.now()}.mp4`
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`

      // Bắt đầu tải
      const download = RNFS.downloadFile({
        fromUrl: videoActive?.url,
        toFile: filePath,
        progress: res => {
          // const percent = (res.bytesWritten / res.contentLength) * 100
          // setProgress(percent)
        },
      })

      // Chờ tải xong
      await download.promise

      // Lưu vào thư viện
      const savePath = OS === 'ios' ? `file://${filePath}` : filePath
      await CameraRoll.saveAsset(savePath, { type: 'video' })

      Toast.show('Tải video thành công!')
    } catch (error) {
      Toast.show('Có lỗi xảy ra!')
    } finally {
      setLoadingDialog(false)
      // setProgress(0)
    }
  }

  const renderVideoItem = useCallback(
    ({ item }: { item: Video }) => {
      return (
        <PostForm
          uri={item.url}
          paused={item.id === currentVideoId && isTabActive}
          name={item.user}
          avtUrl={item.userImageURL}
          number_of_comments={item.comments}
          number_of_like={item.likes}
          onPressMore={() => onShowBottomSheet(item)}
        />
      )
    },
    [currentVideoId, isTabActive]
  )
  const ListFooterComponent = useCallback(() => {
    return (
      <View style={{ backgroundColor: 'white' }}>
        {/* {loading && <ActivityIndicator size="large" color={'red'} />} */}
        {!hasMoreData && <Text>End of list</Text>}
      </View>
    )
  }, [])
  console.log('render test...')

  const keyExtractor = useCallback((item: Video) => item.id, [])
  const renderBody = () => {
    return (
      <>
        <FlatList
          keyExtractor={keyExtractor}
          data={videos}
          renderItem={renderVideoItem}
          contentContainerStyle={styles.container}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          removeClippedSubviews
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={3}
          updateCellsBatchingPeriod={100}
          // decelerationRate="fast"
          disableIntervalMomentum={true}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => setPage(1)}
              colors={['#FF0000']}
              progressBackgroundColor="#FFFFFF"
            />
          }
          onEndReached={() => setPage(prev => prev + 1)}
          ListFooterComponent={ListFooterComponent}
        />
        <Portal>
          <BottomSheetCustom ref={bottomSheetRef} backgroundColor="transparent">
            <View style={styles.bottomSheetContainer}>
              <TouchableOpacity onPress={saveVideo}>
                <Text style={[styles.txtButton, { color: '#F1A22A' }]}>
                  TẢI VIDEO
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                <Text style={styles.txtButton}>THOÁT</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetCustom>
        </Portal>
      </>
    )
  }
  return (
    <ScreenWrapper
      dialogLoading={loadingDialog}
      // isLoading={loading}
      // dialogLoading={true}
      children={renderBody()}
    />
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    gap: 6,
    backgroundColor: '#ccc',
  },
  bottomSheetContainer: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
    gap: 6,
  },
  txtButton: {
    fontSize: 16,
    color: '#262626',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 6,
  },
})
