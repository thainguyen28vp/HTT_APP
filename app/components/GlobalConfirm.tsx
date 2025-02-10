import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageRequireSource,
} from 'react-native'
import { dimensions } from '@app/theme'
import R from '@R'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import FastImage from '@d11/react-native-fast-image'
import images from '@app/assets/imagesAsset'
import { useTheme } from '@app/context/ThemeContext'

type ConfirmProps = {
  title?: string
  content?: string
  action?: () => void
  textConfirm?: string
  textCancel?: string
  icon?: ImageRequireSource
}

type Props = {
  navigation: NavigationProp<any>
  route: { params?: ConfirmProps }
}

const { width } = dimensions

const ModalConfirm = (props: Props) => {
  const { theme } = useTheme()

  const {
    navigation,
    route: { params },
  } = props

  const title = params?.title || R.strings().noti
  const content = params?.content
  const icon = params?.icon
  const action = params?.action
  const textConfirm = params?.textConfirm || R.strings().confirm
  const textCancel = params?.textCancel || R.strings().cancel
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={1}
      onPress={() => navigation.goBack()}
    >
      <TouchableOpacity
        style={[styles.container, { backgroundColor: '#fff' }]}
        activeOpacity={1}
        onPress={e => e.stopPropagation()}
      >
        {!!icon && <FastImage source={icon} style={styles.icon} />}
        <Text
          style={{
            // color: ,
            fontSize: 20,
            fontWeight: '700',
          }}
          children={title}
        />
        <Text
          style={{
            // ...fonts.regular16,
            marginVertical: 20,
            color: '#4B4F58',
            width: '90%',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '400',
          }}
          children={content}
        />

        <View
          style={{
            width: width - 80,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => {
              navigation.goBack()
            }}
            children={
              <Text style={{ color: theme.colors.textLight, fontSize: 16 }}>
                {textCancel}
              </Text>
            }
          />
          <View style={{ width: 16 }} />
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              navigation.goBack()
              !!action && action()
            }}
            children={
              <Text style={{ color: theme.colors.background, fontSize: 16 }}>
                {textConfirm}
              </Text>
            }
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    // ...styleView.centerItem,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 40,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 27,
  },
  btn: {
    // ...styleView.centerItem,
    // ...fonts.semi_bold16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 44,
    borderRadius: 4,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 16,
  },
})

export default ModalConfirm
