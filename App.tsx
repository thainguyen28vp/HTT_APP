import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import AppContainer from './AppContainer'

const App = () => {
  return (
    <>
      <AppContainer />
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
    </>
  )
}

export default App
