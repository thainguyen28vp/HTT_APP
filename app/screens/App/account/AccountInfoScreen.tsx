import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import R from '@R'
import { IAccountState } from './slices/accountSlice.props'
import { useAppSelector } from '@app/redux/store'
import FastImage from '@d11/react-native-fast-image'
import images from '@app/assets/imagesAsset'
import { Formik } from 'formik'
import FormInput from '@app/components/FormInput'
import * as Yup from 'yup'
import ButtonCustom from '@app/components/ButtonCustom'
import { colors, WIDTH } from '@app/theme'
import GenderRadio from './components/GenderRadio'
import { GENDER } from '@app/config/constants'

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

const AccountInfoScreen = () => {
  const { data, isLoading, error, dialogLoading }: IAccountState =
    useAppSelector(state => state.accountReducer)

  const initialValues = {
    full_name: data.displayName || '',
    phone_number: data.phoneNumber || '0987654321',
    birtday: '',
    email: data.email || '',
    address: '',
    gender: GENDER.MALE,
  }

  const renderAvt = () => {
    return (
      <TouchableOpacity style={styles.avt}>
        <FastImage
          style={styles.avt}
          source={data?.photoURL ? { uri: data?.photoURL } : images.ic_account}
        ></FastImage>
        <View style={styles.dotCamera}>
          <FastImage source={images.ic_camera} style={styles.icCamera} />
        </View>
      </TouchableOpacity>
    )
  }
  const submitForm = (values: any) => {
    console.log(values)
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
            <FormInput
              label={R.strings().full_name}
              requireText
              value={values.full_name}
              onChangeText={handleChange('full_name')}
              error={touched.full_name && errors.full_name}
              placeholder={R.strings().enter_full_name}
              backGroundColor={colors.white}
            />
            <FormInput
              label={R.strings().phone_number}
              requireText
              value={values.phone_number}
              onChangeText={handleChange('phone_number')}
              error={touched.phone_number && errors.phone_number}
              placeholder={R.strings().enter_phone_number}
              backGroundColor={colors.white}
              editable={false}
            />
            <FormInput
              label={R.strings().birtday}
              value={values.birtday}
              onChangeText={handleChange('birtday')}
              error={touched.birtday && errors.birtday}
              placeholder={R.strings().enter_birtday}
              rightIcon={images.ic_calendar}
              backGroundColor={colors.white}
              onPress={() => {
                console.log('s')
              }}
            />
            <FormInput
              label={R.strings().email}
              value={values.email}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email}
              placeholder={R.strings().enter_email}
              backGroundColor={colors.white}
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
              backGroundColor={colors.white}
            />

            <ButtonCustom style={styles.btn} onPress={() => handleSubmit()}>
              <Text style={styles.txtBtnLogin}>{R.strings().update}</Text>
            </ButtonCustom>
          </>
        )}
      </Formik>
    )
  }
  return (
    <ScreenWrapper
      titleHeader={R.strings().update_info}
      styles={styles.container}
      scroll
    >
      {renderAvt()}
      {renderForm()}
    </ScreenWrapper>
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
    backgroundColor: colors.primary,
    height: 46,
    borderRadius: 46,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // flexDirection: 'row',
  },
  txtBtnLogin: { color: '#fff', fontSize: 16, fontWeight: '500' },
})
