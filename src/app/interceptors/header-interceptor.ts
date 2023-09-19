import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlatformLocation} from "@angular/common";
import {environment} from "src/environments/environment";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  private apiPath?: string;

  constructor(private platformLocation: PlatformLocation) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = this.getApiPath(this.platformLocation) + req.url;

    return next.handle(req.clone({
      url,
      headers: this.getHeaders(req.headers)
    }));
  }

  getHeaders(headers: HttpHeaders) {
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  getApiPath(platformLocation: any): string {
    if (!this.apiPath) {
      if (platformLocation.location.host.includes('localhost:4200') || platformLocation.location.pathname === '/') {
        // e.g. localhost:4200
        this.apiPath = environment.serverForNgServe + environment.apiName;
      } else {
        this.apiPath = platformLocation.location.origin + environment.apiName;
      }
    }
    return this.apiPath;
  }

}
