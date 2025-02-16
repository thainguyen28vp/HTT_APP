import { FlatList, StyleSheet, ViewToken } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState, useCallback } from 'react'
import { callAPIHook } from '@app/utils/CallApiHelper'
import { requestGetVideos } from '@app/service/Network/order/orderApi'
import PostForm from './components/PostForm'

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
      small: {
        url: string
      }
    }
    userImageURL: string
    user: string
    likes: string | number
    comments: string | number
  }>
}

const HomeScreen = () => {
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState<Video[]>([])
  const isTabActive = useIsFocused()
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)

  const processVideoData = useCallback((data: VideoResponse['hits']) => {
    return data.map(({ videos, id, userImageURL, user, likes, comments }) => ({
      url: videos.small.url,
      userImageURL,
      user,
      likes,
      comments,
      id,
    }))
  }, [])

  const fetchVideos = useCallback(async () => {
    callAPIHook({
      API: requestGetVideos,
      payload: { per_page: 5 },
      useLoading: setLoading,
      typeLoading: 'isLoading',
      onSuccess: (res: VideoResponse) => {
        const processedVideos = processVideoData(res.hits)
        setVideos(processedVideos)
        if (processedVideos.length > 0) {
          setCurrentVideoId(processedVideos[0].id)
        }
      },
      onError: err => console.log('err', err),
      onFinaly: () => setLoading(false),
    })
  }, [processVideoData])

  useEffect(() => {
    fetchVideos()
    return () => setCurrentVideoId(null)
  }, [fetchVideos])

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

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Khi 50% item hiển thị trên màn hình
    waitForInteraction: true,
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
        />
      )
    },
    [currentVideoId, isTabActive]
  )
  console.log('render test...')

  const keyExtractor = useCallback((item: Video) => item.id, [])
  return (
    // <View>
    //   <VideoPlayer
    //     uri={'https://cdn.pixabay.com/video/2024/12/08/245661_small.mp4'}
    //   />
    //   <TouchableOpacity onPress={() => setNum(num + 1)}>
    //     <Text>{num}</Text>
    //   </TouchableOpacity>
    // </View>

    <FlatList
      keyExtractor={keyExtractor}
      data={videos}
      renderItem={renderVideoItem}
      contentContainerStyle={styles.container}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      // Các props tối ưu hoá
      removeClippedSubviews
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      windowSize={5}
      updateCellsBatchingPeriod={100}
      // initialNumToRender={2} // Render 2 items đầu
      // maxToRenderPerBatch={1} // Mỗi lần thêm 1 item
      // windowSize={3} // Giữ 3 "màn hình" trong bộ nhớ

      // pagingEnabled
    />
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    gap: 6,
    backgroundColor: '#ccc',
  },
})
