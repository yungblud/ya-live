import * as fs from 'fs';

import FirebaseAdmin from './models/commons/firebase_admin.model';
import { EN_QUIZ_STATUS } from './models/quiz/interface/EN_QUIZ_STATUS';

const text = fs.readFileSync('./quiz_convert.json', 'utf8');
const parsed = JSON.parse(text) as any[];

const collectionRef = FirebaseAdmin.getInstance()
  .Firestore.collection('quiz')
  .doc('minseo')
  .collection('quiz_bank');

const docRef = FirebaseAdmin.getInstance()
  .Firestore.collection('quiz')
  .doc('minseo');

(async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const data of parsed) {
    // eslint-disable-next-line no-await-in-loop
    await collectionRef.add(data);
  }
  // todo: add or update PREPARE field
  await docRef.set({
    status: EN_QUIZ_STATUS.PREPARE,
  });
})();
