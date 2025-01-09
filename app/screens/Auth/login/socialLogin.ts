import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import { showMessages } from '@app/utils/GlobalAlertHelper'
import R from '@R'

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn()

  // Try the new style of google-sign in result, from v13+ of that module
  let idToken = signInResult.data?.idToken

  if (!idToken) {
    showMessages(R.strings().noti, R.strings().please_try_again)
    return
  }

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential)
}

export { onGoogleButtonPress }
