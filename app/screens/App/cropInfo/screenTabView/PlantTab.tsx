import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@app/context/ThemeContext'
import Line from '../components/Line'

const PlantTab = () => {
  const { theme } = useTheme()
  return (
    <View
      style={[styles.wrapper, { backgroundColor: theme.colors.background }]}
    >
      <Line title="Ngày xuống giống" content="1/12/2023" />
      <Line title="Ngày nảy mầm" content="12/1/2023" />
      <Line title="Số lượng nảy mầm" content="500" />
      <Line title="Ngày ra luống" content="12/12/2023" />
      <Line title="Ngày bắt đầu thu hoạch thực tế" content="2/09/2024" />
      <Line title="Ngày kết thúc thu hoạch thực tế" content="01/01/2023" />
    </View>
  )
}

export default PlantTab

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 12,
    margin: 12,
    borderRadius: 8,
    gap: 12,
  },
})
