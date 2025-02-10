import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React from 'react'
import FastImage from '@d11/react-native-fast-image'
import images from '@app/assets/imagesAsset'
import R from '@R'
import { useTheme } from '@app/context/ThemeContext'

export interface IGardenStaffFormProps {
  name: string
  phone: string
  birthday: string
  gender: string
  email: string
  type_staff: string
}
const GardenStaffForm = ({
  name,
  phone,
  birthday,
  gender,
  email,
  type_staff,
}: IGardenStaffFormProps) => {
  const { theme } = useTheme()
  const stylesTxtinfoTitle = {
    ...styles.txtInfoTitle,
    color: theme.colors.textLight,
  }
  const stylesTxtinfoValue = {
    ...styles.txtInfoTitle,
    color: theme.colors.text,
  }
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text
        style={[styles.txtTitle, { backgroundColor: theme.colors.primary }]}
      >
        {type_staff}
      </Text>
      <View style={styles.wrapperContent}>
        <FastImage source={images.ic_account} style={styles.imgAvt} />
        <View style={{ flex: 1 }}>
          <View style={styles.wrapperInfoItem}>
            <Text style={stylesTxtinfoTitle}>{R.strings().full_name}</Text>
            <Text style={stylesTxtinfoValue}>{name}</Text>
          </View>
          <View style={styles.wrapperInfoItem}>
            <Text style={stylesTxtinfoTitle}>{R.strings().phone_number}</Text>
            <Text style={stylesTxtinfoValue}>{phone}</Text>
          </View>
          <View style={styles.wrapperInfoItem}>
            <Text style={stylesTxtinfoTitle}>{R.strings().birthday}</Text>
            <Text style={stylesTxtinfoValue}>{birthday}</Text>
          </View>
          <View style={styles.wrapperInfoItem}>
            <Text style={stylesTxtinfoTitle}>{R.strings().gender}</Text>
            <Text style={stylesTxtinfoValue}>{gender}</Text>
          </View>
          <View style={styles.wrapperInfoItem}>
            <Text style={stylesTxtinfoTitle}>{R.strings().email}</Text>
            <Text style={stylesTxtinfoValue}> {email}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL(`tel:${phone}`)}
        style={[styles.wrapperButton, { borderColor: theme.colors.primary }]}
      >
        <FastImage source={images.ic_phone} style={styles.ic_phone} />
        <Text style={[styles.txtButton, { color: theme.colors.primary }]}>
          {R.strings().call}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default GardenStaffForm

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 12,
  },
  txtTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    padding: 12,
    width: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  imgAvt: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  wrapperContent: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'greens',
  },
  wrapperInfoItem: {
    flexDirection: 'row',
    marginLeft: 12,
    paddingVertical: 4,
    // flex: 1,
  },
  txtInfoTitle: {
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
  txtInfoValue: {
    fontSize: 14,
    fontWeight: '400',
    // flex: 1,
  },
  wrapperButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 24,
    borderWidth: 1,
    margin: 12,
  },
  ic_phone: {
    width: 24,
    aspectRatio: 1,
    marginRight: 8,
  },
  txtButton: {
    fontSize: 16,
    fontWeight: '600',
  },
})
