import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import R from '@R'
import { Table, Row, TableWrapper, Col } from 'react-native-reanimated-table'
import { useTheme } from '@app/context/ThemeContext'

const tableHead = ['Khu vực', 'Tổng số luống', 'Mã luống', 'Tên luống']
const widthArr = [100, 80, 80, 150]
const colsData = [
  [
    { value: 'Nhà kính ', rowSpan: 3 },
    { value: 'Nhà luoi', rowSpan: 2 },
  ], // Cột 1
  [
    { value: '3', rowSpan: 3 },
    { value: '2', rowSpan: 2 },
  ], // Cột 2
  [
    { value: '01', rowSpan: 1 },
    { value: '02', rowSpan: 1 },
    { value: '03', rowSpan: 1 },
    { value: '04', rowSpan: 1 },
    { value: '05', rowSpan: 1 },
  ], // Cột 3
  [
    { value: `Luống A`, rowSpan: 1 },
    { value: 'Luống B', rowSpan: 1 },
    { value: 'Luống C', rowSpan: 1 },
    { value: 'Luống D', rowSpan: 1 },
    { value: 'Luống E', rowSpan: 1 },
  ], // Cột 4
]

const GardenInfoScreen = () => {
  const { theme } = useTheme()
  const stylesTitle = { ...styles.txtTitle, color: theme.colors.textLight }
  const stylesValue = { ...styles.txtValue, color: theme.colors.text }
  const renderInfo = () => {
    return (
      <View
        style={[
          styles.wrapperInfo,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.txtNameStaff, { color: theme.colors.primary }]}>
          Vườn Lạc Dương
        </Text>
        <View style={styles.wrapperInfoItem}>
          <Text style={stylesTitle}>Tổng diện tích</Text>
          <Text style={stylesValue}>1000m2</Text>
        </View>
        <View style={styles.wrapperInfoItem}>
          <Text style={stylesTitle}>Số luống</Text>
          <Text style={stylesValue}>1000</Text>
        </View>
        <View style={styles.wrapperInfoItem}>
          <Text style={stylesTitle}>Địa chỉ</Text>
          <Text style={stylesValue}>Lạc Dương, Bảo Lộc, Lâm dong</Text>
        </View>
      </View>
    )
  }
  const renderTable = () => {
    return (
      <View>
        <ScrollView horizontal={true}>
          <Table borderStyle={styles.borderStyle}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={[styles.header, { backgroundColor: theme.colors.primary }]}
              textStyle={styles.headerText}
            />

            <TableWrapper style={styles.wrapperColumn}>
              {colsData.map((colData, index) => (
                <Col
                  key={index}
                  data={colData.map(item => item.value)}
                  width={widthArr[index]}
                  heightArr={colData.map(item =>
                    item.rowSpan ? item.rowSpan * 60 : 60
                  )}
                  textStyle={[styles.text, { color: theme.colors.text }]}
                />
              ))}
            </TableWrapper>
          </Table>
        </ScrollView>
      </View>
    )
  }
  return (
    <ScreenWrapper
      styles={{ padding: 20 }}
      titleHeader={R.strings().garden_info}
    >
      {renderInfo()}
      {renderTable()}
    </ScreenWrapper>
  )
}

export default GardenInfoScreen

const styles = StyleSheet.create({
  wrapperInfo: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  txtNameStaff: {
    fontSize: 16,
    fontWeight: '600',
  },
  wrapperInfoItem: {
    flexDirection: 'row',
    marginTop: 12,
  },
  txtTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
  },
  txtValue: {
    fontSize: 14,
    fontWeight: '600',
    width: '50%',
    textAlign: 'right',
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
    flex: 1,
  },
  header: {
    height: 50,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  wrapperColumn: {
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 6,
  },
})
