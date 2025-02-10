import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import R from '@R'
import { Formik, FormikProps } from 'formik'
import FormInput from '@app/components/FormInput'
import ButtonCustom from '@app/components/ButtonCustom'
import * as Yup from 'yup'
import images from '@app/assets/imagesAsset'
import auth, { sendEmailVerification } from '@react-native-firebase/auth'
import { showMessages } from '@app/utils/GlobalAlertHelper'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useTheme } from '@app/context/ThemeContext'

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, R.strings().password_min_six_character)
    .required(R.strings().password_required),
  newPassword: Yup.string()
    .min(6, R.strings().password_min_six_character)
    .required(R.strings().password_required)
    .notOneOf([Yup.ref('password')], R.strings().new_password_no_same_as_old),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], R.strings().password_not_match)
    .min(6, R.strings().password_min_six_character)
    .required(R.strings().password_required),
})
interface FormikValuesProps {
  password: string
  newPassword: string
  confirmNewPassword: string
}

const ChangePasswordScreen = () => {
  const { theme } = useTheme()
  const [isShowPass, setIsShowPass] = useState(false)
  const [isShowNewPass, setIsShowNewPass] = useState(false)
  const [isShowConfirmNewPass, setIsShowConfirmNewPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const initialValues = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  const submitForm = async (values: FormikValuesProps) => {
    setIsLoading(true)
    try {
      const user = auth().currentUser
      if (!user || !user.email) {
        throw new Error('Không tìm thấy thông tin người dùng')
      }
      // Xác thực lại người dùng với mật khẩu hiện tại
      const credentials = auth.EmailAuthProvider.credential(
        user.email,
        values.password
      )
      await user.reauthenticateWithCredential(credentials)
      // Cập nhật mật khẩu mới
      await user.updatePassword(values.newPassword)
      showMessages(
        R.strings().noti,
        R.strings().password_changed_successfully,
        () => {
          setTimeout(() => {
            NavigationUtil.goBack()
          }, 100)
        }
      )
      console.log('success')
    } catch (error: any) {
      let errorMessage = ''
      if (error.code === 'auth/invalid-credential') {
        errorMessage = R.strings().current_password_is_incorrect
      } else {
        errorMessage = R.strings().change_password_failed
      }

      showMessages(R.strings().noti, errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const renderBody = () => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
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
            <FormInput
              label={R.strings().enter_new_password}
              requireText
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              error={touched.newPassword && errors.newPassword}
              placeholder={R.strings().enter_password}
              rightIcon={
                isShowNewPass ? images.ic_eye_show : images.ic_eye_hide
              }
              secureTextEntry={!isShowNewPass}
              onPressRightIcon={() => setIsShowNewPass(!isShowNewPass)}
            />
            <FormInput
              label={R.strings().enter_confirm_new_password}
              requireText
              value={values.confirmNewPassword}
              onChangeText={handleChange('confirmNewPassword')}
              error={touched.confirmNewPassword && errors.confirmNewPassword}
              placeholder={R.strings().enter_password}
              rightIcon={
                isShowConfirmNewPass ? images.ic_eye_show : images.ic_eye_hide
              }
              secureTextEntry={!isShowConfirmNewPass}
              onPressRightIcon={() =>
                setIsShowConfirmNewPass(!isShowConfirmNewPass)
              }
            />
            <ButtonCustom
              style={[styles.btn, { backgroundColor: theme.colors.primary }]}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.txtBtnLogin}>{R.strings().confirm}</Text>
            </ButtonCustom>
          </>
        )}
      </Formik>
    )
  }
  return (
    <ScreenWrapper
      dialogLoading={isLoading}
      styles={{ padding: 20 }}
      titleHeader={R.strings().change_password}
      children={renderBody()}
    />
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
  btn: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 60,
  },
  txtBtnLogin: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
})
