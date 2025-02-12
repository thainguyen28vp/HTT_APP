import { PermissionsAndroid, Platform } from 'react-native'
import {
  check,
  openSettings,
  PERMISSIONS,
  RESULTS,
  request,
} from 'react-native-permissions'
import { showConfirm } from './GlobalAlertHelper'
import R from '@R'
const requestPermissionCamera = () =>
  new Promise(async resolve => {
    const permission =
      Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
    await request(permission).then(async result => {
      check(permission).then(result => {
        if (result === RESULTS.GRANTED) resolve(true)
        else {
          showConfirm('', R.strings().permission_camera, () => {
            openSettings()
          })
        }
      })
    })
  })
const requestPermissionReadLibrary = () =>
  new Promise(async resolve => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
    await request(permission).then(async => {
      check(permission).then(result => {
        if (result === RESULTS.GRANTED) resolve(true)
        else {
          showConfirm('', R.strings().permission_library, () => {
            openSettings()
          })
        }
      })
    })
  })
const requestPermissionWriteLibrary = () =>
  new Promise(async resolve => {
    if (Number(Platform.Version) >= 33) {
      resolve(true)
      return
    }
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    await request(permission).then(async => {
      check(permission).then(result => {
        if (result === RESULTS.GRANTED) resolve(true)
        else {
          showConfirm('', R.strings().permission_library, () => {
            openSettings()
          })
        }
      })
    })
  })

export {
  requestPermissionCamera,
  requestPermissionReadLibrary,
  requestPermissionWriteLibrary,
}
