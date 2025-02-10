import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import R from '@R'
import FastImage from '@d11/react-native-fast-image'
import images from '@app/assets/imagesAsset'
import FormInput from '@app/components/FormInput'
import GardenStaffForm, {
  IGardenStaffFormProps,
} from './components/GardenStaffForm'

const DATA_FAKE: IGardenStaffFormProps[] = [
  {
    name: 'Nguyễn Ngọc Anh',
    phone: '0987654321',
    birthday: '12/12/2000',
    gender: 'Male',
    email: 'ngocanuh102@gmail.com',
    type_staff: 'Quản lý vườn',
  },
  {
    name: 'Nguyen Van A',
    phone: '0987654321',
    birthday: '12/08/1997',
    gender: 'Male',
    email: 'nguyenvana@gmail.com',
    type_staff: 'Kỹ thuật viên',
  },
  {
    name: 'Nguyen Van A',
    phone: '0987654321',
    birthday: '12/12/2000',
    gender: 'Female',
    email: 'nguyenvana@gmail.com',
    type_staff: 'Nhân viên Vườn',
  },
  {
    name: 'Nguyen Van A',
    phone: '0987654321',
    birthday: '12/08/1997',
    gender: 'Male',
    email: 'nguyenvana@gmail.com',
    type_staff: 'Kỹ thuật viên',
  },
  {
    name: 'Nguyen Van A',
    phone: '0987654321',
    birthday: '12/12/2000',
    gender: 'Female',
    email: 'nguyenvana@gmail.com',
    type_staff: 'Nhân viên Vườn',
  },
]

const GardenStaffListScreen = () => {
  const renderIconChat = () => {
    return (
      <TouchableOpacity style={styles.btnChat}>
        <FastImage source={images.ic_chat} style={styles.icChat} />
      </TouchableOpacity>
    )
  }
  const renderBody = () => {
    return (
      <>
        <FormInput
          containerStyle={{ marginTop: 4 }}
          leftIcon={images.ic_search}
          placeholder={R.strings().search_for_name_and_phone}
        />
        {DATA_FAKE.map((item, index) => (
          <GardenStaffForm key={index} {...item} />
        ))}
      </>
    )
  }
  return (
    <ScreenWrapper
      titlePosition="left"
      renderRightComponentHeader={renderIconChat()}
      titleHeader={R.strings().garden_staff_list}
      children={renderBody()}
      styles={styles.container}
      scroll
    />
  )
}

export default GardenStaffListScreen

const styles = StyleSheet.create({
  icChat: {
    width: 24,
    aspectRatio: 1,
    margin: 5,
  },
  btnChat: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
})
