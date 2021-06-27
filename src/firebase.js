import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase
  .initializeApp({
    apiKey: 'AIzaSyAWitE7-HAsXfadxgOTNYOpQfHvnp6KT_E',
    authDomain: 'chatapp-2df52.firebaseapp.com',
    projectId: 'chatapp-2df52',
    storageBucket: 'chatapp-2df52.appspot.com',
    messagingSenderId: '956522034657',
    appId: '1:956522034657:web:d7931e4bc09e94911c0ea0',
  })
  .auth();
