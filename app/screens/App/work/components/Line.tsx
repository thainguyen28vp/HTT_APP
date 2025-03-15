import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@app/context/ThemeContext'
import { scale, verticalScale, moderateScale } from '@common'
interface ILine {
  title: string
  content: string
}
const Line = ({ title, content }: ILine) => {
  const { theme } = useTheme()
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.txtTitle, { color: theme.colors.textLight }]}>
        {title}
      </Text>
      <Text style={[styles.txtContent, { color: theme.colors.text }]}>
        {content}
      </Text>
    </View>
  )
}

export default Line

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  txtTitle: {
    width: '50%',
    fontSize: moderateScale(14),
    fontWeight: '400',
  },
  txtContent: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    width: '50%',
    textAlign: 'right',
  },
})
