import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { dimensions } from '@app/theme'
import R from '@R'
import { useTheme } from '@app/context/ThemeContext'

type AlertProp = {
  title?: string
  content?: string
  action?: () => void
  text?: string
}

interface Props {
  navigation: any
  route: { params?: AlertProp }
}

const { width } = dimensions

const ModalAlert = (props: Props) => {
  const { theme } = useTheme()

  const {
    navigation,
    route: { params },
  } = props

  const title = params?.title || R.strings().noti
  const content = params?.content
  const action = params?.action
  const text = params?.text || R.strings().yes
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <Text
          style={[styles.title, { color: theme.colors.primary }]}
          children={title}
        />
        <Text
          style={[styles.description, { color: theme.colors.text }]}
          children={content}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.pop()
            !!action && action()
          }}
          children={
            <View
              style={[styles.btn, { backgroundColor: theme.colors.primary }]}
              children={
                <Text
                  style={{
                    color: theme.colors.text,
                    textAlign: 'center',
                    fontSize: 16,
                  }}
                >
                  {text}
                </Text>
              }
            />
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderStartColor: 'red',
    // zIndex: 100,
  },
  container: {
    // ...styleView.centerItem,
    width: width - 40,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 27,
  },
  btn: {
    // ...styleView.centerItem,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 80,
    height: 40,
    borderRadius: 8,
  },
  title: { textAlign: 'center', fontSize: 16 },
  description: {
    textAlign: 'center',
    marginVertical: 20,

    fontSize: 14,
  },
})

export default ModalAlert
