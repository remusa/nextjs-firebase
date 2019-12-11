import { Container } from '@material-ui/core'
import React from 'react'
import { AuthProvider } from './Firebase/AuthContext'
import { FirestoreProvider } from './Firebase/FirestoreContext'
import { ThemeProvider } from './Theme/ThemeContext'

interface Props {
  children: any
}

const AppProviders: React.FC<Props> = ({ children }) => (
  <Container>
    <ThemeProvider>
      <AuthProvider>
        <FirestoreProvider>{children}</FirestoreProvider>
      </AuthProvider>
    </ThemeProvider>
  </Container>
)

export default AppProviders
