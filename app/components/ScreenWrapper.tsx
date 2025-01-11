import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleProp,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import React from 'react'
import Header, { HeaderProps } from './Header'
import LoadingProgress from './LoadingProgress'
import Loading from './Loading'
import { colors } from '@app/theme'

interface ScreenWrapperProps extends Omit<HeaderProps, 'titleHeader'> {
  children: React.ReactNode
  isLoading?: boolean
  isError?: object | boolean
  reload?: () => void
  /**
   * Using safe area on ios
   * @default false
   */
  unsafe?: boolean
  /**
   * Visibility status bar
   * @default true
   */
  hidden?: boolean
  /**
   * Using scroll content
   * @default false
   */
  scroll?: boolean
  header?: React.ReactNode
  //   renderBody: () => React.ReactNode
  dialogLoading?: boolean
  styles?: StyleProp<ViewStyle>
  titleHeader?: string
  backgroundColor?: string
}

const ScreenWrapper = (props: ScreenWrapperProps) => {
  const {
    children,
    isLoading,
    isError,
    reload,
    unsafe,
    hidden,
    scroll,
    header,
    titleHeader,
    showBackHeader,
    renderRightComponentHeader,
    dialogLoading = false,
    styles,
    backgroundColor = colors.white,
    onBack,
  } = props
  const renderBody = () => {
    if (isLoading) return <Loading />
    if (isError)
      return (
        <Text>loi</Text>
        // <Error
        //   reload={() => {
        //     if (reload) reload()
        //   }}
        // />
      )
    return (
      <>
        {scroll ? (
          <ScrollView
            contentContainerStyle={[{ flexGrow: 1 }, styles]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[{ flex: 1 }, styles]}>{children}</View>
        )}
      </>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: backgroundColor }}
      keyboardVerticalOffset={0}
    >
      {!!header && header}
      {(!!titleHeader || !!showBackHeader || !!renderRightComponentHeader) && (
        <Header
          titleHeader={titleHeader || ''}
          showBackHeader={showBackHeader}
          renderRightComponentHeader={renderRightComponentHeader}
          onBack={onBack}
        />
      )}
      {!unsafe ? (
        <SafeAreaView style={{ flex: 1 }}>{renderBody()}</SafeAreaView>
      ) : (
        renderBody()
      )}
      {dialogLoading && <LoadingProgress />}
    </KeyboardAvoidingView>
  )
}

export default ScreenWrapper
