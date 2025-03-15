import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import Line from './components/Line'
import ButtonCustom from '@app/components/ButtonCustom'
import ImageWidthLoading from '../../../components/ImageWidthLoading'
import FastImage from '@d11/react-native-fast-image'
import { HEIGHT, OS, WIDTH } from '@app/theme'
import RNFS from 'react-native-fs'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { requestPermissionWriteLibrary } from '@app/utils/AppPermissions'
import images from '@app/assets/imagesAsset'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  interpolate,
  clamp,
} from 'react-native-reanimated'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { scale, verticalScale, moderateScale } from '@common'

const WorkDetails = ({ route }: any) => {
  const { data } = route.params
  const inset = useSafeAreaInsets()
  const [hide, setHide] = useState(false)
  const scrollY = useSharedValue(0)
  const saveImg = () => {
    requestPermissionWriteLibrary().then(res => {
      if (res) {
        downloadAndSaveImage(data.largeImageURL)
      }
    })
  }
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, 100],
        ['transparent', '#FFFFFF'] // Từ trong suốt sang trắng
      ),
    }
  })
  const elevationAnimatedStyle = useAnimatedStyle(() => {
    return {
      elevation: clamp(
        interpolate(scrollY.value, [0, 100], [0, 5], {
          extrapolateRight: 'clamp',
        }),
        0,
        5
      ),
    }
  })
  const bgrBackAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, 100],
        ['rgba(0,0,0,0.3)', 'transparent']
      ),
    }
  })
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollY.value,
        [0, 100],
        ['transparent', '#000000'] // Từ trắng sang đen
      ),
    }
  })
  const iconBackAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 100],
        [0, 1]
        // Từ trắng sang đen
      ),
    }
  })

  const downloadAndSaveImage = async (imageUrl: string) => {
    try {
      // Tạo tên file từ URL
      const fileName = imageUrl.split('/').pop()
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`

      // Tải ảnh từ URL và lưu vào thư mục tạm
      const download = RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: filePath,
      })

      await download.promise

      const savePath = OS === 'ios' ? `file://${filePath}` : filePath

      // Lưu ảnh vào thư viện ảnh
      await CameraRoll.saveAsset(savePath, { type: 'photo' })

      Alert.alert('Success', 'Image saved to gallery!')
    } catch (error) {
      Alert.alert('Error', 'Failed to save image')
      console.error(error)
    }
  }
  const renderHeader = () => {
    const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)
    const AnimatedTouchableOpacity =
      Animated.createAnimatedComponent(TouchableOpacity)
    return (
      <Animated.View
        style={[
          styles.navigationHeader,
          {
            paddingTop: inset.top + verticalScale(6),
            paddingBottom: verticalScale(6),
          },
          headerAnimatedStyle,
          elevationAnimatedStyle,
        ]}
      >
        <AnimatedTouchableOpacity
          onPress={() => NavigationUtil.goBack()}
          style={[styles.bgrIcon, bgrBackAnimatedStyle]}
        >
          <FastImage
            source={images.ic_back}
            tintColor={'white'}
            style={styles.iconBack}
          />
          <AnimatedFastImage
            source={images.ic_back}
            tintColor={'black'}
            style={[styles.iconBack, iconBackAnimatedStyle]}
          />
        </AnimatedTouchableOpacity>
        <Animated.Text style={[styles.txtHeader, textAnimatedStyle]}>
          Chi tiết công việc
        </Animated.Text>
      </Animated.View>
    )
  }
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y
    },
  })
  return (
    <ScreenWrapper>
      {renderHeader()}
      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
        <FastImage
          source={{ uri: data.largeImageURL }}
          style={styles.imgHeader}
        />
        <View style={styles.shadow}>
          <Line title="Tên công việc" content="Phun thuốc phòng rệp" />
          <Line title="Vụ mùa" content="Vụ mùa thứ 1 - Hoa hồng" />
          <Line title="Thời gian giao việc" content="09:00 - 11/12/2023" />
          <Line title="Thời gian bắt đầu" content="09:00" />
          <Line title="Hoàn thành lúc" content="09:15" />
          {hide && (
            <View style={{ gap: verticalScale(8) }}>
              <Line title="Tên công việc" content="Phun thuốc phòng rệp" />
              <Line title="Thời gian giao việc" content="09:00 - 11/12/2023" />
              <Line title="Thời gian bắt đầu" content="09:00" />
              <Line title="Hoàn thành lúc" content="09:15" />
              <Line title="Tên công việc" content="Phun thuốc phòng rệp" />
              <Line title="Vụ mùa" content="Vụ mùa thứ 1 - Hoa hồng" />
              <Line title="Thời gian giao việc" content="09:00 - 11/12/2023" />
              <Line title="Thời gian bắt đầu" content="09:00" />
              <Line title="Hoàn thành lúc" content="09:15" />
            </View>
          )}
          <ButtonCustom onPress={() => setHide(!hide)}>
            <Text style={styles.txtMore}>{!hide ? 'Xem thêm' : 'Ẩn bớt'}</Text>
          </ButtonCustom>
        </View>
        <Text style={styles.txtSaveImg}>Test lưu ảnh</Text>
        <ButtonCustom onPress={saveImg}>
          <FastImage source={{ uri: data.largeImageURL }} style={styles.img} />
        </ButtonCustom>
      </Animated.ScrollView>
    </ScreenWrapper>
  )
}

export default WorkDetails

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: moderateScale(12),
    backgroundColor: 'white',
    padding: scale(12),
    gap: scale(8),
    margin: scale(12),
    // overflow: 'hidden',
  },
  txtMore: {
    color: '#F1A12A',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontWeight: '400',
  },
  img: {
    width: scale(150),
    aspectRatio: 1,
    borderRadius: moderateScale(8),
    margin: scale(12),
  },
  txtSaveImg: {
    paddingVertical: verticalScale(16),
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginLeft: scale(12),
  },
  imgHeader: {
    width: WIDTH,
    height: verticalScale(375),
  },
  navigationHeader: {
    flexDirection: 'row',
    position: 'absolute',
    // backgroundColor: 'red',
    zIndex: 10,
    right: 0,
    left: 0,
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    // borderBottomWidth: 1,
  },
  iconBack: {
    width: moderateScale(24),
    aspectRatio: 1,
    position: 'absolute',
  },
  bgrIcon: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    // padding: 8,
    height: moderateScale(40),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
  },
  txtHeader: {
    fontSize: moderateScale(24),
    color: 'white',
    marginLeft: moderateScale(12),
  },
})
