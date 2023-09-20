import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  page = new BehaviorSubject('email');
  constructor() { }
}
