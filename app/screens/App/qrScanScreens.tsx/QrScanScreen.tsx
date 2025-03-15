import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  useCodeScanner,
  Camera,
  useCameraDevice,
  useCameraPermission,
  CameraProps,
} from 'react-native-vision-camera'
import { HEIGHT, WIDTH } from '@app/theme'
import { showMessages } from '@app/utils/GlobalAlertHelper'
import { useIsFocused } from '@react-navigation/native'
import { requestPermissionCamera } from '@app/utils/AppPermissions'

const scanAreaSize = WIDTH * 0.65

const QrScanScreen = () => {
  const device = useCameraDevice('back')
  const isTabActive = useIsFocused()
  const hasPermission = useCameraPermission()
  const isCheck = useRef(false)

  useEffect(() => {
    requestPermissionCamera()
  }, [hasPermission])

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      isCheck.current = true
      showMessages(
        'Thông tin QR',
        codes[0].value + '',
        () => (isCheck.current = false)
      )
    },
  })

  if (!device)
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Thiet bi k kha dung</Text>
      </View>
    )
  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isTabActive}
        codeScanner={codeScanner}
        zoom={2}
      />

      <View style={styles.overlay}>
        <View style={styles.overlayTop} />
        <Text style={[styles.txt, { top: HEIGHT * 0.2 }]}>QR hoặc mã vạch</Text>
        <Text style={[styles.txt, { bottom: HEIGHT * 0.1 }]}>
          Đưa mã vào khung hình
        </Text>

        <View style={styles.centerRow}>
          <View style={styles.overlayLeftRight} />

          <View style={styles.scanArea}>
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />
          </View>

          <View style={styles.overlayLeftRight} />
        </View>

        <View style={styles.overlayBottom} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  overlayTop: {
    height: (HEIGHT - scanAreaSize) / 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayBottom: {
    height: (HEIGHT - scanAreaSize) / 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centerRow: {
    flexDirection: 'row',
    height: scanAreaSize,
  },
  overlayLeftRight: {
    width: (WIDTH - scanAreaSize) / 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanArea: {
    width: scanAreaSize,
    height: scanAreaSize,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderColor: '#F1A12A',
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 3,
    borderTopWidth: 3,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderRightWidth: 3,
    borderTopWidth: 3,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  txt: {
    position: 'absolute',
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    width: '100%',
    zIndex: 10,
  },
})

export default QrScanScreen
