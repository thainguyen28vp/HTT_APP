import { colors } from '@app/theme'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  btn: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginTop: 60,
  },
  txtBtnLogin: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
})
export default styles
