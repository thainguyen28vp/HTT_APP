import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { requestGetDogList } from '@app/service/Network/order/orderApi'
import { callAPIHook } from '@app/utils/CallApiHelper'
import ScreenWrapper from '@app/components/ScreenWrapper'
import { WIDTH } from '@app/theme'
import ImageWithLoading from '../../home/components/ImageWidthLoading'
import ButtonCustom from '@app/components/ButtonCustom'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER_APP } from '@app/config/screenType'

const TabChild = ({ id }: any) => {
  const [loading, setLoading] = useState(false)
  const [dogs, setDogs] = useState([])
  useEffect(() => {
    callAPIHook({
      API: requestGetDogList,
      payload: { breed_ids: id, limit: 10, page: 0 },
      useLoading: setLoading,
      typeLoading: 'isLoading',
      onSuccess: res => {
        setDogs(res)
      },
      onError: err => {
        console.log('err', err)
      },
      onFinaly: () => {
        setLoading(false)
      },
    })
  }, [])
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
          <ImageWithLoading imageUrl={item?.url} />
          <Text style={styles.txtName}>{item?.id}</Text>
        </ButtonCustom>
      )
    },
    [id]
  )
  return (
    <ScreenWrapper isLoading={loading}>
      <FlatList
        data={dogs}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item: any) => item.id}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ padding: 12, gap: 12 }}
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
