import { requester } from '../../services/requester';
import { getBaseUrl } from '../commons/utils/get_baseurl';
import { QuizOperation, QuizItem } from './interface/I_quiz_operation';
import { QuizParticipant } from './interface/I_quiz_participant';

export async function removeAllParticipants(args: {
  quiz_id: string;
  info: Partial<QuizOperation>;
  isServer: boolean;
}) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.quiz_id}/participants/removeAllParticipants`;
  try {
    const resp = await requester<QuizParticipant[] | null>({
      option: {
        url,
        method: 'get',
      },
    });
    return resp;
  } catch (e) {
    return {
      status: 500,
    };
  }
}

export async function initializeGameScores(args: {
  quiz_id: string;
  info: Partial<QuizOperation>;
  isServer: boolean;
}) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.quiz_id}/participants/initialize`;
  try {
    const resp = await requester<QuizParticipant[] | null>({
      option: {
        url,
        method: 'get',
      },
    });
    return resp;
  } catch (e) {
    return {
      status: 500,
    };
  }
}

export async function getAllParticipantsInfo(args: {
  quiz_id: string;
  info: Partial<QuizOperation>;
  isServer: boolean;
}) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.quiz_id}/participants/all`;
  try {
    const resp = await requester<QuizParticipant[] | null>({
      option: {
        url,
        method: 'get',
      },
    });
    return resp;
  } catch (e) {
    return {
      status: 500,
    };
  }
}

export async function getAliveParticipantsInfo(args: {
  quiz_id: string;
  info: Partial<QuizOperation>;
  isServer: boolean;
}) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.quiz_id}/participants/alive`;
  try {
    const resp = await requester<QuizParticipant[] | null>({
      option: {
        url,
        method: 'get',
      },
    });
    return resp;
  } catch (e) {
    return {
      status: 500,
    };
  }
}

export async function updateQuizOpsForClient(args: {
  quiz_id: string;
  info: Partial<QuizOperation>;
  isServer: boolean;
}) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.quiz_id}`;
  try {
    const resp = await requester<QuizOperation | null>({
      option: {
        url,
        method: 'put',
        data: args.info,
      },
    });
    return resp;
  } catch (err) {
    return {
      status: 500,
    };
  }
}

/** 참석자 전체 인원을 체크한다 */
export async function initTotalParticipants(args: { quiz_id: string; isServer: boolean }) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.quiz_id}/init`;
  try {
    const resp = await requester<boolean>({
      option: {
        url,
        method: 'post',
      },
    });
    return resp;
  } catch (err) {
    return {
      status: 500,
    };
  }
}

/** 각 퀴즈 이벤트의 퀴즈 은행에서 문제를 로딩한다 */
export async function findAllQuizFromBankForClient(args: { quiz_id: string; isServer: boolean }) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.quiz_id}/quiz`;
  try {
    const resp = await requester<QuizItem[] | null>({
      option: {
        url,
        method: 'get',
      },
    });
    return resp;
  } catch (err) {
    return {
      status: 500,
    };
  }
}

export async function updateQuiz(args: {
  festivalId: string;
  quizId: string;
  quiz: Partial<QuizItem>;
  isServer: boolean;
}) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.festivalId}/quiz_bank/${args.quizId}`;

  try {
    const resp = await requester<QuizItem | null>({
      option: {
        url,
        method: 'put',
        data: args.quiz,
      },
    });
    return resp;
  } catch (err) {
    return {
      status: 500,
    };
  }
}

/** 퀴즈가 끝나면, 탈락자 처리를 진행한다. */
export async function calculateQuizRound(args: {
  festivalId: string;
  isServer: boolean;
  quizScore: number;
}) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.festivalId}/calculate?quizScore=${args.quizScore}`;

  try {
    const resp = await requester<QuizOperation | null>({
      option: {
        url,
        method: 'post',
      },
    });
    return resp;
  } catch (err) {
    return {
      status: 500,
    };
  }
}

/** 탈락자가 많이 발생했을 때, 부활 */
export async function reviveCurrentRoundParticipants(args: {
  festivalId: string;
  isServer: boolean;
}) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.festivalId}/revive`;

  try {
    const resp = await requester<QuizOperation | null>({
      option: {
        url,
        method: 'post',
      },
    });
    return resp;
  } catch (err) {
    return {
      status: 500,
    };
  }
}

/** 탈락자가 많이 발생했을 때, 전체 부활 */
export async function reviveAllParticipants(args: { festivalId: string; isServer: boolean }) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.festivalId}/revive/all`;

  try {
    const resp = await requester<QuizOperation | null>({
      option: {
        url,
        method: 'post',
      },
    });
    return resp;
  } catch (err) {
    return {
      status: 500,
    };
  }
}

/** 참가자 상태 초기화 */
export async function initAliveParticipants(args: {
  festivalId: string;
  quizID: string;
  isServer: boolean;
}) {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/quiz/${args.festivalId}/participants?current_quiz_id=${args.quizID}`;

  try {
    const resp = await requester<boolean | null>({
      option: {
        url,
        method: 'put',
      },
    });
    return resp;
  } catch (err) {
    return {
      status: 500,
    };
  }
}
