import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as MaterialProvider } from '@material-ui/styles'
import { createContext } from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components'
import useDarkMode from '../../hooks/useDarkMode'
import { darkTheme, GlobalStyle, lightTheme, materialTheme } from './theme'

interface IContext {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = createContext({} as IContext)

interface IProps {
  children: any
}

const ThemeProvider: React.FC<IProps> = ({ children }) => {
  const [theme, toggleTheme, componentMounted] = useDarkMode()
  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  if (!componentMounted) {
    return <div />
  }

  return (
    <MaterialProvider theme={materialTheme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <StyledProvider theme={currentTheme}>
          <>
            <CssBaseline />
            <GlobalStyle />
            {children}
          </>
        </StyledProvider>
      </ThemeContext.Provider>
    </MaterialProvider>
  )
}

export { ThemeContext, ThemeProvider }

