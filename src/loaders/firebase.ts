import {credential, initializeApp} from 'firebase-admin'

export const defaultApp = initializeApp({
  credential: credential.applicationDefault(),
})

export const auth = defaultApp.auth()

export const database = defaultApp.database()
