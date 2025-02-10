import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FormInput from '@app/components/FormInput'

const HarvestForm = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.txtTitle}>Thu hoạch đợt 1</Text>
      <FormInput
        value="12/05/2023"
        label="Ngày thu hoạch"
        editable={false}
        inputStyle={styles.inputStyle}
        containerStyle={styles.wrapperInput}
      />
      <View style={styles.wrapperQuantity}>
        <FormInput
          value="12/05/2023"
          label="Ngày thu hoạch"
          editable={false}
          inputStyle={styles.inputStyle}
          containerStyle={styles.wrapperInputQuantity}
        />
        <FormInput
          value="12/05/2023"
          label="Ngày thu hoạch"
          editable={false}
          inputStyle={styles.inputStyle}
          containerStyle={styles.wrapperInputQuantity}
        />
      </View>
      <FormInput
        value="22.000"
        label="Giá bán (VND)"
        editable={false}
        inputStyle={styles.inputStyle}
        containerStyle={styles.wrapperInput}
      />
    </View>
  )
}

export default HarvestForm

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    // paddingHorizontal: 12,
    paddingBottom: 12,
    margin: 12,
    borderRadius: 12,
    gap: 12,
  },
  inputStyle: {
    backgroundColor: '#F7F8FA',
    borderColor: '#DCDFE5',
  },
  wrapperInput: {
    marginTop: 0,
    gap: 4,
    paddingHorizontal: 12,
  },
  wrapperQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperInputQuantity: {
    width: '48%',
    marginTop: 0,
    paddingHorizontal: 12,
  },
  txtTitle: {
    color: '#fff',
    backgroundColor: '#F1A12A',
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    fontWeight: '600',
  },
})
