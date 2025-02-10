// src/theme/theme.ts
export interface Theme {
  colors: {
    background: string
    text: string
    textLight: string
    primary: string
    secondary: string
    border: string
    card: string
    error: string
  }
}

export const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    text: '#1E232E',
    textLight: '#4B4F58',
    primary: '#F1A12A',
    secondary: '#5856D6',
    border: '#E5E5EA',
    card: '#F2F2F7',
    error: 'red',
  },
}

export const darkTheme: Theme = {
  colors: {
    background: '#000000',
    text: '#FFFFFF',
    textLight: '#4B4F58',
    primary: '#F1A12A',
    secondary: '#5E5CE6',
    border: '#38383A',
    card: '#1C1C1E',
    error: 'red',
  },
}
