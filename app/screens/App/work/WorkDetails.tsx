import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import Line from './components/Line'
import ButtonCustom from '@app/components/ButtonCustom'
import ImageWidthLoading from '../../../components/ImageWidthLoading'
import FastImage from '@d11/react-native-fast-image'
import { WIDTH } from '@app/theme'
import RNFS from 'react-native-fs'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { requestPermissionWriteLibrary } from '@app/utils/AppPermissions'

const WorkDetails = ({ route }: any) => {
  const { data } = route.params
  const [hide, setHide] = useState(false)
  const saveImg = () => {
    requestPermissionWriteLibrary().then(res => {
      if (res) {
        downloadAndSaveImage(data.url)
      }
    })
  }

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

      // Lưu ảnh vào thư viện ảnh
      await CameraRoll.saveAsset(filePath, { type: 'photo' })

      Alert.alert('Success', 'Image saved to gallery!')
    } catch (error) {
      Alert.alert('Error', 'Failed to save image')
      console.error(error)
    }
  }
  return (
    <ScreenWrapper titleHeader="Chi tiết công việc" styles={{ padding: 12 }}>
      <View style={styles.shadow}>
        <Line title="Tên công việc" content="Phun thuốc phòng rệp" />
        <Line title="Vụ mùa" content="Vụ mùa thứ 1 - Hoa hồng" />
        <Line title="Thời gian giao việc" content="09:00 - 11/12/2023" />
        <Line title="Thời gian bắt đầu" content="09:00" />
        <Line title="Hoàn thành lúc" content="09:15" />
        {hide && (
          <View style={{ gap: 8 }}>
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
        <FastImage source={{ uri: data.url }} style={styles.img} />
      </ButtonCustom>
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
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 12,
    gap: 8,
    // overflow: 'hidden',
  },
  txtMore: {
    color: '#F1A12A',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  img: {
    width: WIDTH * 0.5,
    aspectRatio: 1,
    borderRadius: 8,
  },
  txtSaveImg: {
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
