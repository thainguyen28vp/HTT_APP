import { colors, WIDTH } from '@app/theme'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  flex: {
    // flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: WIDTH * 0.35,
    height: WIDTH * 0.35,
    marginTop: 10,
    marginBottom: 16,
  },
  txtLogin: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    color: colors.text.primary,
    marginBottom: 8,
  },
  txtPleaseLogin: {
    color: colors.text.light,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    fontWeight: '400',
    textAlign: 'center',
    width: WIDTH * 0.75,
    marginBottom: 20,
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
  viewOptionLofin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icFb: {
    width: 48,
    height: 48,
    marginBottom: 12,
    marginHorizontal: 12,
  },
  viewFooter: {
    justifyContent: 'center',
    width: '100%',
  },
  txtOr: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: colors.text.light,
    marginVertical: 20,
  },
  txtRegister: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.error.primary,
    textAlign: 'right',
    marginTop: 8,
    // width: '100%',
    // backgroundColor: 'red',
  },
})

export default styles
