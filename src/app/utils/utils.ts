import {UntypedFormArray, UntypedFormGroup} from "@angular/forms";
import {Constants} from "src/app/utils/constants";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class Utils {

    constructor() {
    }

    // EmailStr maybe an email or sometimes it is a link to a web page. Extract appropriate string.
    static getEmailOrWebLink(emailStr: string) {
        if (emailStr) {
        } else {
            return "";
        }

        let email = emailStr;
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let validEmail = email.toLowerCase().match(validRegex);
        if (validEmail !== null) {
            return '<a href="mailto:' + email + '">' + email + '</a>';
        }
        let urlRegex = /(https?:\/\/[^ ]*)/;
        try {
            // @ts-ignore
            let url = email.match(urlRegex)[1];
            if (url !== null) {
                let pos = email?.indexOf(url);
                let part1 = email?.substring(0, pos);
                let part2 = "";
                pos += url.length;
                if (email?.length > pos) {
                    part2 = email?.substring(pos + 1);
                }
                return part1 + '<a href = "' + url + '" target="_blank">' + url + '</a>' + part2;
            }
        } catch (e: any) {
            return '<a href="https://' + email + '" target="_blank">' + email + '</a>'
        }
        return email;
    }


    static sleep(milliseconds: number) {
        let resolve: (value: (PromiseLike<unknown> | unknown)) => void;
        let promise = new Promise((_resolve) => {
            resolve = _resolve;
        });
        // @ts-ignore
        setTimeout(() => resolve(), milliseconds);
        return promise;
    }

    static isNumber(str: string): boolean {
        if (typeof str !== 'string') {
            return false;
        }

        if (str.trim() === '') {
            return false;
        }

        return !Number.isNaN(Number(str));
    }
  static markControlsTouched(group: UntypedFormGroup | UntypedFormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      // @ts-ignore
      const abstractControl = group.controls[key];

      if (abstractControl instanceof UntypedFormGroup || abstractControl instanceof UntypedFormArray) {
        this.markControlsTouched(abstractControl);
      } else {
        abstractControl.markAsTouched();
      }
    });
  }

  static markControlsDisabled(group: UntypedFormGroup | UntypedFormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      // @ts-ignore
      const abstractControl = group.controls[key];
      if (abstractControl instanceof UntypedFormGroup || abstractControl instanceof UntypedFormArray) {
        this.markControlsDisabled(abstractControl);
      } else {
        abstractControl.disable();
      }
    });
  }

  static markControlsPristine(group: UntypedFormGroup | UntypedFormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      // @ts-ignore
      const abstractControl = group.controls[key];

      if (abstractControl instanceof UntypedFormGroup || abstractControl instanceof UntypedFormArray) {
        this.markControlsPristine(abstractControl);
      } else {
        abstractControl.markAsPristine();
        abstractControl.markAsUntouched();
      }
    });
  }

  static randomChars(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // convert date string from 'dd/MM/yyyy' to 'yyyy-MM-dd' for use in date picker components
  static convertDateStr(src: string) {
    const dateParts: any[] = src.split(Constants.DELIMITER);

    // month is 0-based, that's why we need dataParts[1] - 1
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  }

  // static convertStrToDate(dateStr: string): Date {
  //     if (dateStr) {
  //       const date = dateStr.toString().split(Constants.DELIMITER);
  //       return {
  //         day: parseInt(date[0], 10),
  //         month: parseInt(date[1], 10),
  //         year: parseInt(date[2], 10),
  //       };
  //     }
  //     return null;
  //   }
}
