export class BaseResponse {
  error: string;
  infoMsg: string;
  applicantCnt: number;

  constructor(error: string, infoMsg: string, applicantCnt: number) {
    this.error = error;
    this.infoMsg = infoMsg;
    this.applicantCnt = applicantCnt;
  }
}
