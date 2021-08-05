"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EN_QUIZ_STATUS = void 0;
var EN_QUIZ_STATUS;
(function (EN_QUIZ_STATUS) {
    /** 데이터 수신 요청(최초) */
    EN_QUIZ_STATUS["INIT"] = "INIT";
    /** 준비중 */
    EN_QUIZ_STATUS["PREPARE"] = "PREPARE";
    /** 대기중 */
    EN_QUIZ_STATUS["IDLE"] = "IDLE";
    /** 문제 제출 */
    EN_QUIZ_STATUS["QUIZ"] = "QUIZ";
    /** 문제 풀이 */
    EN_QUIZ_STATUS["COUNTDOWN"] = "COUNTDOWN";
    /** 집계(계산) 중 */
    EN_QUIZ_STATUS["CALCULATE"] = "CALCULATE";
    /** 결과 송출 */
    EN_QUIZ_STATUS["SHOW_RESULT"] = "SHOW_RESULT";
    /** 종료! */
    EN_QUIZ_STATUS["FINISH"] = "FINISH";
})(EN_QUIZ_STATUS = exports.EN_QUIZ_STATUS || (exports.EN_QUIZ_STATUS = {}));
