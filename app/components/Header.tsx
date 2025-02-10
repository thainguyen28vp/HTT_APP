import {
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native'
import React, { Component } from 'react'
import FastImage from '@d11/react-native-fast-image'
import { OS } from '@app/theme'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@R'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@app/context/ThemeContext'

export interface HeaderProps {
  titleHeader: string
  renderRightComponentHeader?: React.ReactNode
  titlePosition?: 'center' | 'left'
  showBackHeader?: boolean
  onBack?: () => void
  colorsBack?: string
  backgroundColor?: string
  bottomWidthColor?: string
}

const Header = (props: HeaderProps) => {
  const { theme } = useTheme()
  const {
    titleHeader,
    renderRightComponentHeader,
    titlePosition = 'center',
    showBackHeader = true,
    onBack,
    colorsBack,
    backgroundColor = 'transparent',
    bottomWidthColor = 'transparent',
  } = props
  const insets = useSafeAreaInsets()
  return (
    <>
      <View style={{ height: insets.top }} />
      <View
        style={[
          styles.container,
          {
            borderBottomColor: bottomWidthColor,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        {showBackHeader && (
          <TouchableOpacity
            style={[
              { zIndex: 1, marginLeft: 16 },
              titlePosition == 'center' && styles.positionIcon,
            ]}
            onPress={onBack || NavigationUtil.goBack}
          >
            <FastImage
              source={R.images.ic_back}
              style={{ width: 24, height: 24 }}
              tintColor={
                colorsBack ? theme.colors.text : theme.colors.textLight
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title,
            { color: theme.colors.text, textAlign: titlePosition },
            titlePosition == 'left' && { paddingLeft: 16 },
          ]}
        >
          {titleHeader}
        </Text>
        {!!renderRightComponentHeader && titlePosition != 'center' && (
          <View style={{ paddingRight: 16 }}>{renderRightComponentHeader}</View>
        )}
      </View>
    </>
  )
}

export default Header
const styles = StyleSheet.create({
  leftComp: {
    backgroundColor: 'green',
    width: 24,
    height: 24,
  },
  container: {
    height: OS == 'ios' ? (isIphoneX() ? 45 : 40) : 40,
    borderBottomColor: '#E7E7E7',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  positionIcon: {
    position: 'absolute',
  },
})
