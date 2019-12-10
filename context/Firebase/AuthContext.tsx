import { User } from 'firebase'
import { useRouter } from 'next/dist/client/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { fireauth, googleProvider } from '../../utils/firebase'

interface IUser {
  user: {
    uid: string
    email: string
  }
}

interface IContext {
  user: User
  loggedIn: boolean
  loginWithEmail: (email: string, password: string) => void
  registerWithEmail: (email: string, password: string) => void
  loginWithGoogle: () => void
  logout: () => void
}

const AuthContext = createContext({} as IContext)

interface Props {}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(fireauth.currentUser ? fireauth.currentUser : null)
  const [loggedIn, setIsLoggedIn] = useState<boolean>(fireauth.currentUser ? true : false)
  const router = useRouter()

  useEffect(() => {
    fireauth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        setIsLoggedIn(true)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
    })

    // return () => unsubscribe
  }, [])

  const loginWithGoogle = async () => {
    await fireauth.signInWithPopup(googleProvider)
    router.push('/')
  }

  const logout = async () => {
    await fireauth.signOut()
    // setUser(null)
    // setIsLoggedIn(false)
    router.push('/login')
  }

  const loginWithEmail = async (email: string, password: string) => {
    const response = await fireauth.signInWithEmailAndPassword(email, password).catch(error => {
      throw new Error(`${error.message} - ${error.code}`)
    })

    if (response) {
      const user: User = fireauth.currentUser
      // const token = await user.getIdToken()

      // firestore
      //   .collection('users')
      //   .doc(response.user.uid)
      //   .set(user)

      setUser(user)
      setIsLoggedIn(true)
      router.push('/')
    }
  }

  const registerWithEmail = async (email: string, password: string) => {
    const response = await fireauth.createUserWithEmailAndPassword(email, password).catch(error => {
      throw new Error(`${error.message} - ${error.code}`)
    })

    if (response) {
      const user: User = fireauth.currentUser

      setUser(user)
      setIsLoggedIn(true)
      router.push('/')
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loggedIn, loginWithEmail, loginWithGoogle, registerWithEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
