import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import R from '@R'
import { IAccountState } from './slices/accountSlice.props'
import { useAppDispatch, useAppSelector } from '@app/redux/store'
import FastImage from '@d11/react-native-fast-image'
import images from '@app/assets/imagesAsset'
import { Formik } from 'formik'
import FormInput from '@app/components/FormInput'
import * as Yup from 'yup'
import ButtonCustom from '@app/components/ButtonCustom'
import GenderRadio from './components/GenderRadio'
import { GENDER } from '@app/config/constants'
import auth from '@react-native-firebase/auth'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DateUtil from '@app/utils/DateUtil'
import BottomSheetCustom from '@app/components/BottomSheetCustom'
import BottomSheet from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  MediaType,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  PhotoQuality,
} from 'react-native-image-picker'
import { showMessages } from '@app/utils/GlobalAlertHelper'
import { requestUserThunk } from './slices/accountSlice'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { Easing } from 'react-native-reanimated'
import { useTheme } from '@app/context/ThemeContext'
import {
  requestPermissionCamera,
  requestPermissionReadLibrary,
} from '@app/utils/AppPermissions'

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required(R.strings().full_name_required),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      R.strings().email_invalid
    )
    .required(R.strings().email_required),
})
interface IOptions {
  mediaType: MediaType
  quality: PhotoQuality
  maxWidth: number
  maxHeight: number
  includeBase64: boolean
  // saveToPhotos: boolean
}
const options: IOptions = {
  mediaType: 'photo',
  quality: 1,
  maxWidth: 1024,
  maxHeight: 1024,
  includeBase64: false,
  // saveToPhotos: true, // Lưu ảnh vào thư viện (chỉ với camera)
}

const AccountInfoScreen = () => {
  const { theme } = useTheme()
  const { data, isLoading, error, dialogLoading }: IAccountState =
    useAppSelector(state => state.accountReducer)
  const dispatch = useAppDispatch()
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [photoUser, setPhotoUser] = useState<string | undefined>(undefined)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [loading, setLoading] = useState(false)
  const initialValues = {
    full_name: data.displayName || '',
    phone_number: data.phoneNumber || '0987654321',
    birthday: new Date(),
    email: data.email || '',
    address: '',
    gender: GENDER.MALE,
    photoURL: data.photoURL,
  }

  const submitForm = async (values: any) => {
    setLoading(true)
    const user = auth().currentUser
    if (user) {
      await user
        .updateProfile({
          displayName: data.displayName,
        })
        .then(() => {
          dispatch(requestUserThunk())
          showMessages('', R.strings().update_success, () => {
            setTimeout(() => {
              NavigationUtil.goBack()
            }, 100)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
    setLoading(false)
  }
  const openGallery = () => {
    requestPermissionReadLibrary().then(check => {
      bottomSheetRef.current?.close()
      if (check) {
        launchImageLibrary(options, (response: ImagePickerResponse) => {
          if (response.didCancel || response.errorCode) {
            console.log('Người dùng đã hủy chọn ảnh')
          } else {
            // Lấy ảnh đầu tiên được chọn
            const image = response.assets?.[0]
            if (image) {
              setPhotoUser(image?.uri)
              console.log('URI ảnh:', image.uri)
              console.log('Tên file:', image.fileName)
              console.log('Kích thước:', image.fileSize)
              console.log('Kiểu:', image.type)

              // Xử lý ảnh ở đây (ví dụ: upload lên server)
              // uploadImage(image);
            }
          }
        })
      }
    })
  }
  const openCamera = () => {
    requestPermissionCamera().then(check => {
      bottomSheetRef.current?.close()
      if (check) {
        launchCamera(options, (response: ImagePickerResponse) => {
          if (response.didCancel) {
            console.log('Người dùng đã hủy chụp ảnh')
          } else if (response.errorCode) {
            console.log('Lỗi: ', response)
          } else {
            const image = response.assets?.[0]
            if (image) {
              setPhotoUser(image?.uri)
              console.log('URI ảnh:', image.uri)
              // Xử lý ảnh chụp được
            }
          }
        })
      }
    })
  }

  const renderForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.expand()}
              style={styles.avt}
            >
              <FastImage
                style={styles.avt}
                source={
                  photoUser
                    ? { uri: photoUser }
                    : values?.photoURL
                    ? { uri: values?.photoURL }
                    : images.ic_account
                }
                resizeMode="cover"
              ></FastImage>
              <View style={styles.dotCamera}>
                <FastImage source={images.ic_camera} style={styles.icCamera} />
              </View>
            </TouchableOpacity>
            <FormInput
              label={R.strings().full_name}
              requireText
              value={values.full_name}
              onChangeText={handleChange('full_name')}
              error={touched.full_name && errors.full_name}
              placeholder={R.strings().enter_full_name}
              backGroundColor={theme.colors.background}
            />

            <FormInput
              label={R.strings().phone_number}
              requireText
              value={values.phone_number}
              onChangeText={handleChange('phone_number')}
              error={touched.phone_number && errors.phone_number}
              placeholder={R.strings().enter_phone_number}
              backGroundColor={theme.colors.background}
              editable={false}
            />
            <FormInput
              label={R.strings().birthday}
              value={DateUtil.formatDisplayDate(values.birthday)}
              onChangeText={handleChange('birthday')}
              placeholder={R.strings().enter_birthday}
              rightIcon={images.ic_calendar}
              backGroundColor={theme.colors.background}
              onPress={() => setIsDatePickerVisible(true)}
            />
            <FormInput
              label={R.strings().email}
              value={values.email}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email}
              placeholder={R.strings().enter_email}
              backGroundColor={theme.colors.background}
            />
            <GenderRadio
              value={values.gender}
              onChange={(value: any) => setFieldValue('gender', value)}
            />
            <FormInput
              label={R.strings().address}
              value={values.address}
              onChangeText={handleChange('address')}
              error={touched.address && errors.address}
              placeholder={R.strings().enter_address}
              multiline
              inputStyle={{ height: 70 }}
              backGroundColor={theme.colors.background}
            />

            <ButtonCustom
              style={[styles.btn, { backgroundColor: theme.colors.primary }]}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.txtBtnLogin}>{R.strings().update}</Text>
            </ButtonCustom>
            <DateTimePickerModal
              timePickerModeAndroid={'spinner'}
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={date => {
                setFieldValue('birthday', date)
                setIsDatePickerVisible(false)
              }}
              onCancel={() => setIsDatePickerVisible(false)}
              maximumDate={new Date()}
              date={values.birthday}
            />
          </>
        )}
      </Formik>
    )
  }
  const renderButtomSheet = () => {
    const insets = useSafeAreaInsets()
    return (
      <BottomSheetCustom
        animationConfigs={{
          duration: 250,
        }}
        ref={bottomSheetRef}
        backgroundColor="transparent"
        containerStyle={[
          styles.butttomSheet,
          { paddingBottom: Platform.OS === 'ios' ? insets.bottom : 20 },
        ]}
      >
        <TouchableOpacity
          onPress={openCamera}
          style={[styles.button, { marginBottom: 10 }]}
        >
          <Text style={styles.txtButton}>Chụp ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery} style={styles.button}>
          <Text style={styles.txtButton}>Chọn ảnh</Text>
        </TouchableOpacity>
      </BottomSheetCustom>
    )
  }
  return (
    <ScreenWrapper
      titleHeader={R.strings().update_info}
      styles={styles.container}
      scroll
      renderComponent={renderButtomSheet()}
      children={renderForm()}
      dialogLoading={loading || isLoading}
    />
  )
}

export default AccountInfoScreen

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: '#F7F8FA' },
  avt: { width: 80, aspectRatio: 1, borderRadius: 40 },
  dotCamera: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 26,
    height: 26,
    borderRadius: 26,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icCamera: { width: 16, height: 16 },
  btn: {
    marginTop: 20,
    height: 46,
    borderRadius: 46,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // flexDirection: 'row',
  },
  txtBtnLogin: { color: '#fff', fontSize: 16, fontWeight: '500' },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  txtButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  butttomSheet: {
    paddingHorizontal: 20,
  },
})
