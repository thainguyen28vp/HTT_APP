import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import FastImage from '@d11/react-native-fast-image'
import images from '@app/assets/imagesAsset'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FormInput from '@app/components/FormInput'
import R from '@R'
import CropForm from './components/CropForm'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER_APP } from '@app/config/screenType'
import { useTheme } from '@app/context/ThemeContext'
import { requestBreedThunk } from '../work/slice/breedSlice'
import { useAppDispatch } from '@app/redux/store'
import ItemList from '@app/components/ItemList'
import ImageWithLoading from '@app/components/ImageWidthLoading'
import { WIDTH } from '@app/theme'
import { callAPIHook } from '@app/utils/CallApiHelper'
import { requestGetDogList } from '@app/service/Network/order/orderApi'

export default function HomeScreen() {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const [dogs, setDogs] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    dispatch(requestBreedThunk())
  }, [])
  useEffect(() => {
    callAPIHook({
      API: requestGetDogList,
      payload: { limit: 20 },
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
    (item: any) => (
      <View style={styles.wrapper}>
        <ImageWithLoading imageUrl={item?.url} />
        <Text style={styles.txtName}>{item?.id}</Text>
      </View>
    ),
    []
  )
  const renderBody = () => {
    return (
      <>
        <FormInput
          containerStyle={{
            marginTop: 0,
            backgroundColor: 'transparent',
            borderRadius: 8,
            padding: 16,
          }}
          placeholder={R.strings().search_seasons_and_flower_type}
          leftIcon={images.ic_search}
          onPress={() =>
            NavigationUtil.navigate(SCREEN_ROUTER_APP.WORK, {
              changeIndex: Math.floor(Math.random() * 7),
            })
          }
        />
        <ItemList data={dogs} renderItem={renderItem} rows={2} columns={2} />
        <TouchableOpacity
          style={[
            styles.wrapperBtnDay,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text
            style={[
              styles.txtDay,
              {
                color: theme.colors.background,
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.primary,
              },
              styles.borderText,
            ]}
          >
            {R.strings().day}
          </Text>
          <View
            style={[
              styles.wrapperDay,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text
              style={[
                styles.txtDay,
                { color: theme.colors.background },
                { marginRight: 12 },
              ]}
            >
              01/07/2023 - 31/07/2023
            </Text>
            <FastImage
              tintColor={theme.colors.background}
              source={images.ic_calendar}
              style={styles.imgBell}
            />
          </View>
        </TouchableOpacity>
        <CropForm
          onPress={() => NavigationUtil.navigate(SCREEN_ROUTER_APP.CROP_INFO)}
          title="Vụ mùa thứ 1"
          statusValue="Chuẩn bị"
          dayStart="01/07/2023"
          acreage="1000m2"
          cropType="Cây lạc"
          image={images.ic_account}
        />
        <CropForm
          onPress={() => NavigationUtil.navigate(SCREEN_ROUTER_APP.CROP_INFO)}
          title="Vụ mùa thứ 1"
          statusValue="Chuẩn bị"
          dayStart="01/07/2023"
          acreage="1000m2"
          cropType="Cây lạc"
          image={images.ic_account}
        />
        <CropForm
          onPress={() => NavigationUtil.navigate(SCREEN_ROUTER_APP.CROP_INFO)}
          title="Vụ mùa thứ 1"
          statusValue="Chuẩn bị"
          dayStart="01/07/2023"
          acreage="1000m2"
          cropType="Cây lạc"
          image={images.ic_account}
        />
        <CropForm
          onPress={() => NavigationUtil.navigate(SCREEN_ROUTER_APP.CROP_INFO)}
          title="Vụ mùa thứ 1"
          statusValue="Chuẩn bị"
          dayStart="01/07/2023"
          acreage="1000m2"
          cropType="Cây lạc"
          image={images.ic_account}
        />
      </>
    )
  }
  const renderHeader = () => {
    return (
      <View style={[styles.wrapperHeader, { paddingTop: insets.top + 8 }]}>
        <View
          style={[styles.wrapperLogo, { borderColor: theme.colors.primary }]}
        >
          <FastImage source={images.logo} style={styles.logo} />
        </View>
        <Text style={[styles.txtNameGarden, { color: theme.colors.primary }]}>
          Vườn Lạc Dương
        </Text>
        <View style={styles.wrapperIcon}>
          <View style={styles.wrapperChat}>
            <FastImage source={images.ic_chat} style={styles.imgBell} />
          </View>
          <View style={[styles.wrapperChat, { marginLeft: 8 }]}>
            <FastImage source={images.ic_bell} style={styles.imgBell} />
          </View>
        </View>
      </View>
    )
  }
  return (
    <ScreenWrapper
      isLoading={loading}
      styles={styles.container}
      header={renderHeader()}
      children={renderBody()}
      scroll
    />
  )
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  wrapperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  wrapperLogo: {
    padding: 4,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  logo: {
    width: 36,
    height: 36,
  },
  txtNameGarden: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 8,
  },
  wrapperChat: {
    padding: 6,
    borderRadius: 100,
    backgroundColor: '#F5F5F5',
  },
  imgBell: {
    width: 24,
    height: 24,
  },
  wrapperIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperBtnDay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 12,
    marginHorizontal: 16,
  },
  wrapperDay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  txtDay: {
    fontSize: 16,
    fontWeight: '500',
    height: '100%',
  },
  borderText: {
    paddingHorizontal: 20,
    marginRight: 1,
    padding: 8,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    height: '100%',
  },
  wrapper: {
    width: '100%',
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
