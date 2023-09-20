import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseResponse} from "src/app/dtos/base-response";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getBuildProperties(): Observable<any> {
    return this.http.get<BaseResponse>('/api/system/buildproperties');
  }

  postEmailResponse(body: string): Observable<any> {
    return this.http.post<String>('/api/email', body);
  }

  postChatResponse(body: string): Observable<any> {
    return this.http.post<String>('/api/chat', body);
  }

}
