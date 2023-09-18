import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui';
import 'firebase/compat/auth';
import 'firebaseui/dist/firebaseui.css'
import { auth } from '../firebase';

export const configureFirebaseUI = (from: string = "/"): void => {
  const uiConfig: firebaseui.auth.Config = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          window.location.assign(from)
          return false;
        }
      },
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
        }
      ],
      signInFlow: 'popup'

    }
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

    ui.start('#firebaseui-auth-container', uiConfig)
}