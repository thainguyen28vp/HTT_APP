import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import R from '@R'
import FormInput from '@app/components/FormInput'
import images from '@app/assets/imagesAsset'
import * as Yup from 'yup'
import { Formik } from 'formik'
import ButtonCustom from '@app/components/ButtonCustom'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { onGoogleButtonPress } from './socialLogin'
import { showMessages } from '@app/utils/GlobalAlertHelper'
import LoadingProgress from '@app/components/LoadingProgress'
import {
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
  SCREEN_ROUTER_AUTH,
} from '@app/config/screenType'
import ScreenWrapper from '@app/components/ScreenWrapper'
import AsyncStorageService from '@service/AsyncStorage/AsyncStorageService'
import NavigationUtil from '@app/navigation/NavigationUtil'

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      R.strings().email_invalid
    )
    .required(R.strings().email_required),
  password: Yup.string()
    .min(6, R.strings().password_min_six_character)
    .required(R.strings().password_required),
})
interface FormikProps {
  username: string
  password: string
}
const LoginScreen = (props: any) => {
  const { navigation } = props
  const [isLoading, setIsLoading] = useState(false)
  const [isShowPass, setIsShowPass] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '121572489765-kq5jt29cuqvhhm04bda99mq8rt3h5l48.apps.googleusercontent.com',
    })
  }, [])

  const initialValues = {
    username: '',
    password: '',
  }

  const submitForm = async (values: FormikProps) => {
    setIsLoading(true)
    await auth()
      .signInWithEmailAndPassword(values.username, values.password)
      .then(result => {
        const { user } = result
        AsyncStorageService.putToken(user.uid)
        NavigationUtil.navigate(SCREEN_ROUTER.MAIN)
      })
      .catch(error => {
        showMessages(R.strings().noti, R.strings().login_faile)
      })
    setIsLoading(false)
  }

  const onPressFbLogin = async () => {}

  const onPressGoogleLogin = async () => {
    setIsLoading(true)
    await onGoogleButtonPress().then(result => {
      if (!!result?.user) {
        AsyncStorageService.putToken(result?.user?.uid)
        NavigationUtil.navigate(SCREEN_ROUTER.MAIN)
      } else {
        showMessages(R.strings().noti, R.strings().login_faile)
      }
    })
    setIsLoading(false)
  }
  const onPressAppleLogin = () => {
    console.log('onPressGoogleLogin')
  }
  const renderHeader = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image source={R.images.logo} style={styles.logo} />
        <Text style={styles.txtLogin}>{R.strings().login}</Text>
        <Text style={styles.txtPleaseLogin}>{R.strings().pleaseLogin}</Text>
      </View>
    )
  }
  const renderForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <FormInput
              label={R.strings().email}
              requireText
              value={values.username}
              onChangeText={handleChange('username')}
              error={touched.username && errors.username}
              placeholder={R.strings().enter_email}
            />
            <FormInput
              label={R.strings().password}
              requireText
              value={values.password}
              onChangeText={handleChange('password')}
              error={touched.password && errors.password}
              placeholder={R.strings().enter_password}
              rightIcon={isShowPass ? images.ic_eye_show : images.ic_eye_hide}
              secureTextEntry={!isShowPass}
              onPressRightIcon={() => setIsShowPass(!isShowPass)}
            />
            <ButtonCustom style={styles.btn} onPress={() => handleSubmit()}>
              <Text style={styles.txtBtnLogin}>{R.strings().login}</Text>
            </ButtonCustom>
          </>
        )}
      </Formik>
    )
  }
  const renderFooter = () => {
    return (
      <View style={styles.viewFooter}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_ROUTER_AUTH.REGISTER)}
        >
          <Text style={styles.txtRegister}>{R.strings().no_account}</Text>
        </TouchableOpacity>
        <Text style={styles.txtOr}>{R.strings().or}</Text>
        <View style={styles.viewOptionLofin}>
          <ButtonCustom
            onPress={onPressGoogleLogin}
            children={<Image source={images.ic_google} style={styles.icFb} />}
          />
          <ButtonCustom
            onPress={onPressFbLogin}
            children={<Image source={images.ic_fb} style={styles.icFb} />}
          />
          <ButtonCustom
            onPress={onPressAppleLogin}
            children={<Image source={images.ic_apple} style={styles.icFb} />}
          />
        </View>
      </View>
    )
  }
  return (
    <ScreenWrapper scroll styles={styles.body} dialogLoading={isLoading}>
      {renderHeader()}
      {renderForm()}
      {renderFooter()}
    </ScreenWrapper>
  )
}

export default LoginScreen
