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

  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(({ user }) => {
        console.log('user', user)
        setUser(user)
        return user
      })
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => setUser(false))
  }

  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) setUser(user)
  //     else setUser(false)

  //     return () => unsubscribe()
  //   })
  // }, [])

  return {
    user,
    signinWithGoogle,
    signout,
  }
}
