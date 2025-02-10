import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import AppContainer from './AppContainer'
import { ThemeProvider } from '@app/context/ThemeContext'

const App = () => {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  )
}

export default App
