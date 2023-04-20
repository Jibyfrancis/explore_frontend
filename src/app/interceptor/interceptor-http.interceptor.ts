import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment'

@Injectable()
export class InterceptorHttpInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const commonUrl = environment.commonUrl
    console.log({ request });
    let newRequest = request.clone({
      url: commonUrl + request.url
    })

    return next.handle(newRequest);
  }

}
