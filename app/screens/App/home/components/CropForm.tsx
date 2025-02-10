import {
  StyleSheet,
  Text,
  View,
  ImageRequireSource,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import React from 'react'
import R from '@R'
import FastImage from '@d11/react-native-fast-image'
import { useTheme } from '@app/context/ThemeContext'
interface IProps {
  title: string
  statusValue: string
  dayStart: string
  acreage: string
  cropType: string
  image: ImageRequireSource
  style?: StyleProp<ViewStyle>
  onPress: TouchableOpacityProps['onPress']
}
const CropForm = ({
  title,
  statusValue,
  dayStart,
  acreage,
  cropType,
  image,
  style,
  onPress,
}: IProps) => {
  const { theme } = useTheme()
  const stylesTitleContent = {
    ...styles.txtTitleContent,
    color: theme.colors.textLight,
  }
  const stylesTxtValue = { ...styles.txtValue }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text
        style={[
          styles.txtTitle,
          {
            color: 'black',
            backgroundColor: '#fff',
          },
        ]}
      >
        {title}
      </Text>

      <View style={[styles.wrapper, { backgroundColor: '#fff' }]}>
        <View style={styles.wrapperContent}>
          <Text style={stylesTitleContent}>{R.strings().status}</Text>
          <Text
            style={[
              styles.txtStatusValue,
              {
                color: theme.colors.background,
                backgroundColor: theme.colors.primary,
              },
            ]}
          >
            {statusValue}
          </Text>
        </View>
        <View style={styles.wrapperContent}>
          <Text style={stylesTitleContent}>{R.strings().day_start}</Text>
          <Text style={[stylesTxtValue]}>{dayStart}</Text>
        </View>
        <View style={styles.wrapperContent}>
          <Text style={stylesTitleContent}>{R.strings().acreage}</Text>
          <Text style={[stylesTxtValue]}>{acreage}</Text>
        </View>
        <View style={styles.wrapperContent}>
          <Text style={stylesTitleContent}>{R.strings().crop_type}</Text>
          <Text style={[stylesTxtValue]}>{cropType}</Text>
        </View>
        <View style={styles.wrapperContent}>
          <Text style={stylesTitleContent}>{R.strings().image}</Text>
          <FastImage source={image} style={styles.img} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CropForm

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txtTitle: {
    fontSize: 16,
    fontWeight: '600',

    marginBottom: 1,
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  wrapperContent: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 6,
    // paddingHorizontal: 12,
    // backgroundColor: colors.white,

    // justifyContent:'space-between'
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  txtTitleContent: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
  },

  img: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 12,
  },
  txtStatusValue: {
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  txtValue: {
    fontSize: 14,
    fontWeight: '600',
  },
})
