import Head from 'next/head'
import { useAuth } from '../lib/auth'
import styles from '../styles/Home.module.css'

export default function Home() {
  const auth = useAuth()

  return (
    <div className={styles.container}>
      <Head>
        <title>Next Hours App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Next hours!</h1>

        {auth.user ? (
          <button onClick={auth.signout}>Sign out</button>
        ) : (
          <button onClick={auth.signinWithGoogle}>Sign in</button>
        )}

        <pre style={{ width: '500px' }}>
          {JSON.stringify(auth.user, null, 2)}
        </pre>
      </main>
    </div>
  )
}
