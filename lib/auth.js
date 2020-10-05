import firebase from './firebase'
import { createContext, useContext, useEffect, useState } from 'react'

const authContext = createContext()

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  const provider = new firebase.auth.GoogleAuthProvider()

  useEffect(() => {
    const unsubscribe = async () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) setUser(user)
        else setUser(false)
      })

    return () => unsubscribe()
  }, [])

  const signinWithGoogle = async () => {
    const { user } = await firebase.auth().signInWithPopup(provider)
    setUser(user)
    return user
  }

  const signout = async () => {
    await firebase.auth().signOut()
    return setUser(false)
  }

  return {
    user,
    signinWithGoogle,
    signout,
  }
}
