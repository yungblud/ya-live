import debug from 'debug';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const { privateKey, clientEmail, projectId, databaseurl } = process.env;

const log = debug('tjl:models:firebaseadmin');

interface Config {
  databaseurl: string;
  credential: {
    privateKey: string;
    clientEmail: string;
    projectId: string;
  };
}

export default class FirebaseAdmin {
  public static instance: FirebaseAdmin;

  private init = false;

  public static getInstance() {
    if (!FirebaseAdmin.instance) {
      FirebaseAdmin.instance = new FirebaseAdmin();
      FirebaseAdmin.instance.bootstrap();
    }
    return FirebaseAdmin.instance;
  }

  /** firestore */
  public get Firestore() {
    if (this.init === false) {
      this.bootstrap();
    }
    return admin.firestore();
  }

  public get Auth() {
    if (this.init === false) {
      this.bootstrap();
    }
    return admin.auth();
  }

  private bootstrap(): void {
    if (!!admin.apps.length === true) {
      this.init = true;
      return;
    }
    log('bootstrap start');
    const config: Config = {
      databaseurl: databaseurl || '',
      credential: {
        privateKey: (privateKey || '').replace(/\\n/g, '\n'),
        clientEmail: clientEmail || '',
        projectId: projectId || '',
      },
    };

    admin.initializeApp({
      databaseURL: config.databaseurl,
      credential: admin.credential.cert(config.credential),
    });
    log('bootstrap end');
    this.init = true;
  }
}
