import firebase from './firebase'
import { createContext, useContext, useEffect, useState } from 'react'

const authContext = createContext()

export const ProvideAuth = ({ children }) => {
  const db = firebase.firestore()
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  // const provider = new firebase.auth.GoogleAuthProvider()

  useEffect(() => {
    const unsubscribe = async () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user)
        } else setUser(null)
      })

    return () => unsubscribe()
  }, [])

  const signinWithGoogle = async () => {
    const { user } = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())

    const customUserData = (
      await db.collection('users').doc(user.uid).get()
    ).data()

    if (!customUserData)
      db.collection('users').doc(user.uid).set({
        hours: 40,
        createdAt: new Date(),
      })

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
