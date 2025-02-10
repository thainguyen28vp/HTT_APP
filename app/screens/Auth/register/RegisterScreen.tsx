import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import React, { useState } from 'react'
import Header from '@app/components/Header'
import R from '@R'
import { Formik } from 'formik'
import ButtonCustom from '@app/components/ButtonCustom'
import FormInput from '@app/components/FormInput'
import * as Yup from 'yup'
import images from '@app/assets/imagesAsset'
import styles from './styles'
import auth from '@react-native-firebase/auth'
import ScreenWrapper from '@app/components/ScreenWrapper'
import { showMessages } from '@app/utils/GlobalAlertHelper'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER_AUTH } from '@app/config/screenType'
import { useTheme } from '@app/context/ThemeContext'

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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], R.strings().password_not_match)
    .required(R.strings().password_required),
})
interface FormikValuesProps {
  username: string
  password: string
  confirmPassword: string
}

const RegisterScreen = () => {
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [isShowPass, setIsShowPass] = useState(false)
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false)

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  }

  const submitForm = async (values: FormikValuesProps) => {
    setIsLoading(true)
    await auth()
      .createUserWithEmailAndPassword(values.username, values.password)
      .then(() => {
        showMessages(R.strings().noti, R.strings().register_success, () =>
          setTimeout(() => {
            NavigationUtil.goBack()
          }, 300)
        )
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          showMessages(R.strings().noti, R.strings().email_already_in_use)
        } else {
          showMessages(R.strings().noti, R.strings().login_faile)
        }
      })
    setIsLoading(false)
  }

  const renderForm = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                onPressRightIcon={() => setIsShowPass(!isShowPass)}
                secureTextEntry={!isShowPass}
              />
              <FormInput
                label={R.strings().confirm_password}
                requireText
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                error={touched.confirmPassword && errors.confirmPassword}
                placeholder={R.strings().enter_password}
                rightIcon={
                  isShowConfirmPass ? images.ic_eye_show : images.ic_eye_hide
                }
                onPressRightIcon={() =>
                  setIsShowConfirmPass(!isShowConfirmPass)
                }
                secureTextEntry={!isShowConfirmPass}
              />

              <ButtonCustom
                style={[styles.btn, { backgroundColor: theme.colors.primary }]}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.txtBtnLogin}>{R.strings().login}</Text>
              </ButtonCustom>
            </>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    )
  }
  return (
    <ScreenWrapper
      titleHeader={R.strings().register_account}
      children={renderForm()}
      scroll
      styles={styles.container}
      dialogLoading={isLoading}
    />
  )
}

export default RegisterScreen
