import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { requestGetDogList } from '@app/service/Network/order/orderApi'
import { callAPIHook } from '@app/utils/CallApiHelper'
import ScreenWrapper from '@app/components/ScreenWrapper'
import { WIDTH } from '@app/theme'
import ImageWithLoading from '@app/components/ImageWidthLoading'
import ButtonCustom from '@app/components/ButtonCustom'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER_APP } from '@app/config/screenType'
const PER_PAGE = 16
const TabChild = ({ id }: any) => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dogs, setDogs] = useState<any[]>([])
  const [hasMoreData, setHasMoreData] = useState(true)

  const fetchImage = useCallback(async () => {
    if (!hasMoreData) {
      return
    }
    callAPIHook({
      API: requestGetDogList,
      payload: { q: id, page, per_page: PER_PAGE },
      useLoading: page === 1 ? setIsRefreshing : setLoading,
      typeLoading: undefined,
      onSuccess: res => {
        // setDogs(res.hits)
        if (page === 1) {
          setDogs(res.hits)
        } else {
          setDogs(prev => [...prev, ...res.hits])
        }
        if (res.hits.length < PER_PAGE) setHasMoreData(false)
      },
      onError: err => {
        console.log('err', err)
      },
      onFinaly: () => {
        page === 1 ? setIsRefreshing(false) : setLoading(false)
      },
    })
  }, [page, hasMoreData])
  const onLoadMore = () => {
    if (!dogs.length) return
    setPage(prev => prev + 1)
  }
  useEffect(() => {
    fetchImage()
  }, [page])
  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <ButtonCustom
          onPress={() =>
            NavigationUtil.navigate(SCREEN_ROUTER_APP.WORK_DETAILS, {
              data: item,
            })
          }
          style={styles.wrapper}
        >
          <ImageWithLoading imageUrl={item?.largeImageURL} />
          <Text style={styles.txtName}>{item?.id}</Text>
        </ButtonCustom>
      )
    },
    [id]
  )
  const ListFooterComponent = useCallback(() => {
    return (
      <View style={{ backgroundColor: 'white', paddingVertical: 16 }}>
        {loading && <ActivityIndicator size="large" color={'red'} />}
        {!hasMoreData && <Text>End of list</Text>}
      </View>
    )
  }, [])
  return (
    <ScreenWrapper>
      <FlatList
        data={dogs}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item: any) => item.id}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ padding: 12, gap: 12 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => setPage(1)}
            colors={['#FF0000']}
            progressBackgroundColor="#FFFFFF"
          />
        }
        onEndReached={onLoadMore}
        ListFooterComponent={ListFooterComponent}
      />
    </ScreenWrapper>
  )
}

export default memo(TabChild)

const styles = StyleSheet.create({
  wrapper: {
    width: (WIDTH - 36) / 2,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 12,
    paddingBottom: 8,
  },
  txtName: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 6,
  },
})
