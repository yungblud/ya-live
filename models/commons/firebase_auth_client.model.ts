import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import debug from 'debug';

const config = {
  projectId: 'sleepy-owl-6a78a',
  apiKey: 'AIzaSyAtbpCdHNEZDGFasmj1XPNSoChE1C0Uwn4',
  authDomain: 'sleepy-owl-6a78a.firebaseapp.com',
};

const log = debug('tjl:models:firebase_auth_client');

export default class FirebaseAuthClient {
  public static instance: FirebaseAuthClient;

  private auth: firebase.default.auth.Auth;

  private fireStore: firebase.default.firestore.Firestore;

  public constructor() {
    if (!!firebaseApp.apps.length === false) {
      log(config);
      firebaseApp.initializeApp(config);
    }
    this.auth = firebaseApp.auth();
    this.fireStore = firebaseApp.firestore();
    console.log('firebase auth client constructor');
  }

  public static getInstance() {
    if (!FirebaseAuthClient.instance) {
      FirebaseAuthClient.instance = new FirebaseAuthClient();
    }
    return FirebaseAuthClient.instance;
  }

  public get Auth() {
    return this.auth;
  }

  public get FireStore() {
    return this.fireStore;
  }

  public isInitialized(): Promise<firebase.default.User | null> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  public signInWithGoogle() {
    const provider = new firebaseApp.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider);
  }
}
