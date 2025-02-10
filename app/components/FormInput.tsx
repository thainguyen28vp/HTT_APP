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
import * as Animatable from 'react-native-animatable'
import { useTheme } from '@app/context/ThemeContext'

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
  editable?: boolean
  onPress?: TouchableOpacityProps['onPress']
  backGroundColor?: string
}

const FormInput = (props: FormInputProps) => {
  const { theme } = useTheme()

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
    editable = true,
    onPressRightIcon,
    onPress,
    backGroundColor,
    ...inputProps
  } = props
  const Component = !!onPress ? TouchableOpacity : View

  return (
    <View style={[styles.container, containerStyle]}>
      {!!label && (
        <View style={styles.labelContainer}>
          <Text
            style={[styles.textLabel, { color: theme.colors.text }, labelStyle]}
          >
            {label}
          </Text>
          {requireText && <Text style={styles.requireText}> *</Text>}
        </View>
      )}
      <Component
        style={[
          styles.inputContainer,
          { borderColor: theme.colors.border },
          backGroundColor && { backgroundColor: backGroundColor },
        ]}
        onPress={onPress}
      >
        {!!leftIcon && (
          <FastImage
            source={leftIcon}
            style={styles.leftIcon}
            tintColor={theme.colors.text}
          />
        )}

        <TextInput
          pointerEvents={!!onPress ? 'none' : 'auto'}
          placeholderTextColor={theme.colors.textLight}
          style={[
            styles.input,
            { color: theme.colors.text },
            inputStyle,
            !editable && { color: theme.colors.textLight },
            !!leftIcon && { marginLeft: 0 },
          ]}
          editable={!!onPress ? false : editable}
          {...inputProps}
        />

        {!!rightIcon && (
          <View>
            {!!rightIcon && !onPressRightIcon ? (
              <FastImage
                source={rightIcon}
                style={styles.rightIcon}
                tintColor={theme.colors.text}
              />
            ) : (
              <TouchableOpacity
                onPress={onPressRightIcon}
                children={
                  <FastImage
                    source={rightIcon}
                    style={styles.rightIcon}
                    tintColor={theme.colors.text}
                  />
                }
              />
            )}
          </View>
        )}
      </Component>
      {!!error && (
        <Animatable.Text
          animation="fadeIn"
          style={[styles.errorText, { color: theme.colors.error }, errorStyle]}
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
    marginTop: 20,
  },
  labelContainer: {
    flexDirection: 'row',
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
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
    borderRadius: 8,
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginLeft: 12,
  },
  rightIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
})
