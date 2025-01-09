import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import R from '@R'
import FormInput from '@app/components/FormInput'
import images from '@app/assets/imagesAsset'
import * as Yup from 'yup'
import { Formik } from 'formik'
import ButtonCustom from '@app/components/ButtonCustom'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import reactotron from 'ReactotronConfig'
import { onGoogleButtonPress } from './socialLogin'
import { showMessages } from '@app/utils/GlobalAlertHelper'

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Tên đăng nhập ít nhất 3 ký tự')
    .required('Vui lòng nhập tên đăng nhập'),
  password: Yup.string()
    .min(6, 'Mật khẩu ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
})

const LoginScreen = () => {
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
  const onPressFbLogin = () => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!'
      )
      .then(() => {
        console.log('User account created & signed in!')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!')
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        }

        console.error(error)
      })
  }

  const onPressAppleLogin = () => {
    onGoogleButtonPress().then(result => {
      if (!!result?.additionalUserInfo) {
        showMessages(R.strings().noti, R.strings().login_success)
      }
    })
  }
  const onPressGoogleLogin = () => {
    console.log('onPressGoogleLogin')
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.flex}>
        <Image source={R.images.logo} style={styles.logo} />
        <Text style={styles.txtLogin}>{R.strings().login}</Text>
        <Text style={styles.txtPleaseLogin}>{R.strings().pleaseLogin}</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values)
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <FormInput
                label={R.strings().username}
                requireText
                value={values.username}
                onChangeText={handleChange('username')}
                error={touched.username && errors.username}
                placeholder={R.strings().enter_username}
              />
              <FormInput
                label={R.strings().password}
                requireText
                value={values.password}
                onChangeText={handleChange('password')}
                error={touched.password && errors.password}
                placeholder={R.strings().enter_password}
                rightIcon={images.ic_eye_hide}
                onPressRightIcon={() => {}}
              />
              <ButtonCustom style={styles.btn} onPress={() => handleSubmit()}>
                <Text style={styles.txtBtnLogin}>{R.strings().login}</Text>
              </ButtonCustom>
            </>
          )}
        </Formik>
        <View style={styles.viewFooter}>
          <Text style={styles.txtRegister}>{R.strings().no_account}</Text>
          <Text style={styles.txtOr}>{R.strings().or}</Text>
          <View style={styles.viewOptionLofin}>
            <ButtonCustom
              onPress={onPressFbLogin}
              children={<Image source={images.ic_fb} style={styles.icFb} />}
            />
            <ButtonCustom
              onPress={onPressAppleLogin}
              children={<Image source={images.ic_apple} style={styles.icFb} />}
            />
            <ButtonCustom
              onPress={onPressGoogleLogin}
              children={<Image source={images.ic_google} style={styles.icFb} />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen
