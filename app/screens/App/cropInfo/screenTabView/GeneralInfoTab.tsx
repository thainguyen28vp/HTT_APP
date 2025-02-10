import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@app/context/ThemeContext'
import Line from '../components/Line'
interface ILine2 {
  title: string
  content: string[]
}
const GeneralInfoTab = () => {
  const { theme } = useTheme()
  const Line2 = ({ title, content }: ILine2) => {
    return (
      <View>
        <Text style={[styles.txtTitle, { color: theme.colors.textLight }]}>
          {title}
        </Text>
        <View style={styles.wrapperContent}>
          {content.map((value, index) => (
            <Text
              key={index}
              style={[
                styles.txtContent,
                {
                  color: theme.colors.primary,
                  borderColor: theme.colors.primary,
                },
              ]}
            >
              {value}
            </Text>
          ))}
        </View>
      </View>
    )
  }
  return (
    <View
      style={[styles.wrapper, { backgroundColor: theme.colors.background }]}
    >
      <Line title="Tên vụ mùa" content="Vụ mùa thứ 2" />
      <Line title="Loại hoa" content="Hoa hồng" />
      <Line2 title="Khu vực" content={['Nhà kính', 'Nhà lưới']} />
      <Line2
        title="Luống trồng"
        content={[
          'Luống 1 - Nhà Kính',
          'Luống 2 - Nhà Kính',
          'Luống 1 - Nhà Lưới',
        ]}
      />
      <Line title="Ngày bắt đầu" content="12/12/2023" />
      <Line title="Ngày dự kiến thu hoạch" content="12/12/2024" />
      <Line title="Số lượng cây giống" content="500" />
      <Line title="Sản lượng dự kiến" content="500" />
      <Line title="Ngắt ngọn" content="10 cm" />
      <Line title="Đơn vị" content="Bó 0.5 kg" />
      <Line title="Khoảng cách (cm)" content="25" />
      <Line title="Diện tích trồng (m^2)" content="1000" />
    </View>
  )
}

export default GeneralInfoTab

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
  txtTitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  wrapperContent: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 8,
    flexWrap: 'wrap',
  },
  txtContent: {
    fontSize: 16,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
})
