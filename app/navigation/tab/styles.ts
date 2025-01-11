import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  tab: {
    alignItems: 'center',
    alignContent: 'center',
    // marginTop: 11,
    backgroundColor: 'red',
  },
  img_icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  txtLabel: {
    fontSize: 12,
  },
})
export default styles
