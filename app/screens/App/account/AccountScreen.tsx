import {
  View,
  Text,
  ImageRequireSource,
  StyleSheet,
  Switch,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import FastImage from '@d11/react-native-fast-image'
import images from '@app/assets/imagesAsset'
import { useAppDispatch, useAppSelector } from '@app/redux/store'
import { IAccountState } from './slices/accountSlice.props'
import R from '@R'
import { clearDataInfo, requestUserThunk } from './slices/accountSlice'
import ButtonCustom from '@app/components/ButtonCustom'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER, SCREEN_ROUTER_APP } from '@app/config/screenType'
import { showConfirm } from '@app/utils/GlobalAlertHelper'
import auth from '@react-native-firebase/auth'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { useTheme } from '@app/context/ThemeContext'
import { OS } from '@app/theme'

interface IOptionItem {
  sourceImg: ImageRequireSource
  title: string
  onPress?: () => void
  color?: string
  renderRightC?: React.ReactNode
}
const OptionItem = ({
  sourceImg,
  title,
  onPress,
  color,
  renderRightC,
}: IOptionItem) => {
  const { theme } = useTheme()
  return (
    <ButtonCustom onPress={onPress} style={styles.btnOption}>
      <FastImage
        source={sourceImg}
        style={styles.iconOption}
        tintColor={theme.colors.text}
      />
      <Text
        style={[
          styles.txtTitle,
          { color: theme.colors.text },
          // { color: color },
        ]}
      >
        {title}
      </Text>
      {!!renderRightC ? (
        renderRightC
      ) : (
        <FastImage
          source={images.ic_arrow_go}
          style={styles.icBack}
          tintColor={theme.colors.text}
        />
      )}
    </ButtonCustom>
  )
}

const AccountScreen = (props: any) => {
  const { theme, isDarkMode, toggleTheme } = useTheme()
  const { navigation } = props
  const [loading, setLoading] = useState(false)
  const { data, isLoading, error, dialogLoading }: IAccountState =
    useAppSelector(state => state.accountReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(requestUserThunk())
  }, [])

  const handleLogOut = async () => {
    setLoading(true)
    await auth().signOut()
    await AsyncStorageService.removeToken()
    dispatch(clearDataInfo())
    navigation.reset({
      index: 0,
      routes: [{ name: SCREEN_ROUTER.SPLASH }],
    })
    setLoading(false)
  }

  const renderAvatar = () => {
    return (
      <View style={styles.wrapperAvt}>
        <FastImage
          source={data.photoURL ? { uri: data.photoURL } : images.ic_account}
          style={styles.avtImage}
        />
        <Text style={[styles.txtName, { color: theme.colors.text }]}>
          {data.displayName || R.strings().account}
        </Text>
        <Text style={[styles.txtEmail, { color: theme.colors.textLight }]}>
          {data.email || R.strings().account}
        </Text>
      </View>
    )
  }
  const renderOption = () => {
    return (
      <>
        <OptionItem
          sourceImg={images.ic_info_circle}
          title={R.strings().update_info}
          onPress={() => NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATE_INFO)}
        />
        <OptionItem
          sourceImg={images.ic_tree}
          title={R.strings().garden_info}
          onPress={() => NavigationUtil.navigate(SCREEN_ROUTER_APP.GARDEN_INFO)}
        />
        <OptionItem
          sourceImg={images.ic_user_check}
          title={R.strings().garden_staff}
          onPress={() =>
            NavigationUtil.navigate(SCREEN_ROUTER_APP.GARDEN_STAFF)
          }
        />
        <OptionItem
          sourceImg={images.ic_lock}
          title={R.strings().change_password}
          onPress={() =>
            NavigationUtil.navigate(SCREEN_ROUTER_APP.CHANGE_PASSWORD)
          }
        />
        <OptionItem
          sourceImg={images.ic_lock}
          title={'Dark mode'}
          renderRightC={
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
            />
          }
        />

        <OptionItem
          sourceImg={images.ic_logout}
          title={R.strings().logout}
          onPress={() =>
            showConfirm(
              R.strings().noti,
              R.strings().you_want_logout,
              handleLogOut,
              '',
              '',
              images.img_logout
            )
          }
          color={theme.colors.primary}
        />
      </>
    )
  }

  return (
    <ScreenWrapper
      styles={{ backgroundColor: theme.colors.background }}
      isLoading={isLoading || loading}
      scroll
    >
      {renderAvatar()}
      {renderOption()}
    </ScreenWrapper>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  wrapperAvt: {
    alignItems: 'center',
    paddingTop: OS == 'android' ? '10%' : '20%',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    marginHorizontal: 15,
    marginBottom: 12,
  },
  avtImage: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 40,
    marginBottom: 12,
  },
  txtName: {
    fontSize: 18,
    fontWeight: '400',
  },
  txtEmail: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 20,
    marginTop: 10,
  },
  iconOption: {
    width: 24,
    height: 24,
  },
  icBack: {
    width: 20,
    height: 20,
  },
  btnOption: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  txtTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 12,
  },
})
