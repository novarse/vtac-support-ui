import {environment} from "src/environments/environment";

export class Constants {

  static readonly HISTORYTYPE_CALL = 'CALL';
  static readonly HISTORYTYPE_RESPONSE = 'RESPONSE';
  static readonly IS_PROD = environment.production;
  static readonly DELIMITER = '/';
  static readonly CHAT = 'CHAT';
  static readonly EMAIL = 'EMAIL';

}
