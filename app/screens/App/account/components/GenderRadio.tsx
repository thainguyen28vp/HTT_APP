import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import FastImage from '@d11/react-native-fast-image'
import images from '@app/assets/imagesAsset'
import R from '@R'
import { GENDER } from '@app/config/constants'
import { useTheme } from '@app/context/ThemeContext'

interface GenderRadioProps {
  value: string
  onChange: (value: string) => void
}
const GenderRadio = ({ value, onChange }: GenderRadioProps) => {
  const { theme } = useTheme()
  return (
    <View style={styles.container}>
      <Text style={[styles.txtTitle, { color: theme.colors.text }]}>
        {R.strings().gender}
      </Text>
      <View style={styles.wrapperRadio}>
        <TouchableOpacity
          onPress={() => onChange(GENDER.MALE)}
          style={styles.radioContainer}
        >
          <View
            style={[
              styles.radio,
              value === GENDER.MALE
                ? { backgroundColor: theme.colors.primary }
                : { borderWidth: 1, borderColor: theme.colors.border },
            ]}
          >
            <FastImage source={images.ic_check} style={styles.icCheck} />
          </View>
          <Text style={styles.txtGender}>{R.strings().male}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChange(GENDER.FEMALE)}
          style={[styles.radioContainer, { marginLeft: 48 }]}
        >
          <View
            style={[
              styles.radio,
              value === GENDER.FEMALE
                ? { backgroundColor: theme.colors.primary }
                : { borderWidth: 1, borderColor: theme.colors.border },
            ]}
          >
            <FastImage source={images.ic_check} style={styles.icCheck} />
          </View>
          <Text style={styles.txtGender}>{R.strings().female}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  wrapperRadio: {
    flexDirection: 'row',
    marginTop: 8,
  },
  txtTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    marginTop: 12,
  },
  icCheck: {
    width: 9,
    height: 9,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 4,
    // borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtGender: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '400',
    marginLeft: 12,
  },
})
export default GenderRadio
