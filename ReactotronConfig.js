import ReactTron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const reactotron = ReactTron.configure({
  name: 'React Native Demo',
})
  .configure('wsbase')
  .use(reactotronRedux())
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect()

console.tron = ReactTron
export default reactotron
