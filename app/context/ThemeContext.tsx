// src/context/ThemeContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { lightTheme, darkTheme, Theme } from '../theme'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'

interface ThemeContextType {
  theme: Theme
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme()
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark')

  const theme = isDarkMode ? darkTheme : lightTheme

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    saveThemePreference(!isDarkMode)
  }

  const saveThemePreference = async (darkMode: boolean) => {
    try {
      await AsyncStorageService.saveString('darkMode', darkMode ? '1' : '0')
    } catch (error) {
      console.error('Error saving theme preference:', error)
    }
  }

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorageService.load('darkMode')
      if (savedTheme !== null) {
        setIsDarkMode(!!Number(savedTheme))
      }
    } catch (error) {
      console.error('Error loading theme preference:', error)
    } finally {
    }
  }
  useEffect(() => {
    loadThemePreference()
  }, [])
  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark')
  }, [systemColorScheme])

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
