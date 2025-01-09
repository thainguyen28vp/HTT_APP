import {
  ImageRequireSource,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native'
import React, { memo } from 'react'
import FastImage from '@d11/react-native-fast-image'
import { colors } from '@app/theme'
import * as Animatable from 'react-native-animatable'

interface FormInputProps extends TextInputProps {
  label?: string
  labelStyle?: TextStyle
  requireText?: boolean
  leftIcon?: ImageRequireSource
  containerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<ViewStyle>
  errorStyle?: StyleProp<ViewStyle>
  rightIcon?: ImageRequireSource
  showRightIcon?: boolean
  // error?: string | string[] | FormikErrors<any> | FormikErrors<any>[]
  error?: string | false | undefined
  onPressRightIcon?: TouchableOpacityProps['onPress']
}

const FormInput = (props: FormInputProps) => {
  const {
    label,
    labelStyle,
    requireText,
    leftIcon,
    containerStyle,
    inputStyle,
    rightIcon,
    showRightIcon,
    error,
    errorStyle,
    onPressRightIcon,
    ...inputProps
  } = props
  return (
    <View style={[styles.container, containerStyle]}>
      {!!label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.textLabel, labelStyle]}>{label}</Text>
          {requireText && <Text style={styles.requireText}> *</Text>}
        </View>
      )}
      <View style={styles.inputContainer}>
        {!!leftIcon && <FastImage source={leftIcon} style={styles.leftIcon} />}
        <TextInput
          placeholderTextColor={colors.text.light}
          style={[styles.input, inputStyle]}
          {...inputProps}
        />
        {!!rightIcon && !onPressRightIcon ? (
          <FastImage source={rightIcon} style={styles.rightIcon} />
        ) : (
          <TouchableOpacity
            onPress={onPressRightIcon}
            children={<FastImage source={rightIcon} style={styles.rightIcon} />}
          />
        )}
      </View>
      {!!error && (
        <Animatable.Text
          animation="fadeIn"
          style={[styles.errorText, errorStyle]}
          children={error}
        />
      )}
    </View>
  )
}

export default memo(FormInput)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
  },
  labelContainer: {
    flexDirection: 'row',
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    color: colors.text.dark,
  },
  requireText: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#F04257',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.colorDefault.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    // paddingVertical: 15,
    marginTop: 8,
    height: 48,
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  rightIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text.dark,
  },
  errorText: {
    fontSize: 12,
    color: colors.colorDefault.error,
    marginTop: 4,
    textAlign: 'right',
  },
})
