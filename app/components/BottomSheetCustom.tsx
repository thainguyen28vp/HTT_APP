import React, { ForwardedRef, forwardRef } from 'react'
import { StyleProp, Text, ViewStyle } from 'react-native'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetProps,
} from '@gorhom/bottom-sheet'
import { useTheme } from '@app/context/ThemeContext'

interface CustomBottomSheetProps extends BottomSheetProps {
  children: React.ReactNode
  backgroundColor?: string
  containerStyle?: StyleProp<ViewStyle>
}
const BottomSheetCustom = (
  props: CustomBottomSheetProps,
  ref: ForwardedRef<BottomSheet>
) => {
  const { theme } = useTheme()

  const {
    children,
    backgroundColor = theme.colors.background,
    containerStyle,
    ...propss
  } = props
  return (
    <BottomSheet
      {...propss}
      index={-1}
      ref={ref}
      enablePanDownToClose
      handleComponent={() => <></>}
      backgroundStyle={{ backgroundColor: backgroundColor }}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
          opacity={0.5}
          style={[
            props.style,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          ]}
        />
      )}
    >
      <BottomSheetView style={containerStyle}>{children}</BottomSheetView>
    </BottomSheet>
  )
}

export default forwardRef(BottomSheetCustom)
