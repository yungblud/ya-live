import debug from 'debug';
import { NextApiRequest, NextApiResponse } from 'next';

import quizController from '../../../../../controllers/quiz.controller';

const log = debug('tjl:api:quiz:participants:index');

/** quiz/participant root */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line no-console
  const { method, query } = req;
  log({ method, query });
  console.log('initialize', method, query);
  if (method === 'GET') {
    console.log(method, query);
    await quizController.removeAllParticipants({ query, res });
  }
  res.status(404).end();
}
