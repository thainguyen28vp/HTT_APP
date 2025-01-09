import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, dimensions } from '@app/theme'
import R from '@R'
import { NavigationProp, RouteProp } from '@react-navigation/native'

type ConfirmProps = {
  title?: string
  content?: string
  action?: () => void
  textConfirm?: string
  textCancel?: string
}

type Props = {
  navigation: NavigationProp<any>
  route: { params?: ConfirmProps }
}

const { width } = dimensions

const ModalConfirm = (props: Props) => {
  const {
    navigation,
    route: { params },
  } = props

  const title = params?.title || R.strings().noti
  const content = params?.content
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
        style={styles.container}
        activeOpacity={1}
        onPress={e => e.stopPropagation()}
      >
        <Text style={{ color: colors.text.primary }} children={title} />
        <Text
          style={{
            // ...fonts.regular16,
            marginVertical: 20,
            color: colors.text.dark,
            width: '90%',
            textAlign: 'center',
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
              <Text style={{ color: colors.text.light }}>{textCancel}</Text>
            }
          />
          <View style={{ width: 16 }} />
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.primary }]}
            onPress={() => {
              navigation.goBack()
              !!action && action()
            }}
            children={
              <Text style={{ color: colors.white }}>{textConfirm}</Text>
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
    backgroundColor: colors.white,
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
})

export default ModalConfirm
