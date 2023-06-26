import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable()
export class InterceptorHttpInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const commonUrl = environment.commonUrl;
    const user = localStorage.getItem('user') ?? '{}';
    const userData = JSON.parse(user);
    const userToken = userData.token;

    const admin: any = localStorage.getItem('admin') ?? '{}';
    const adminData = JSON.parse(admin);
    const adminToken = adminData.token;

    console.log(userToken)
    console.log(adminToken);

    if (userToken && adminToken) {
      const isAdminRoute = request.url.includes('admin');
      const mapApi=request.url.includes('mapbox');
      if(mapApi){
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${userToken}`,
          },
          url: request.url,
        });
        return next.handle(newRequest);


      }

      if (isAdminRoute) {
        // Use admin token for admin routes
        console.log('admin');

        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${adminToken}`,
          },
          url: commonUrl + request.url,
        });
        return next.handle(newRequest);
      }

      else {
        // Use user token for non-admin routes
        console.log('user');
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${userToken}`,
          },
          url: commonUrl + request.url,
        });
        return next.handle(newRequest);
      }

    } else if (adminToken && adminData.userName === 'admin') {
      // Use admin token if only admin token is present
      console.log('admin');

      const newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${adminToken}`,
        },
        url: commonUrl + request.url,
      });
      return next.handle(newRequest);
    } else if (userToken ) {
      const mapApi=request.url.includes('mapbox');
      if(mapApi){
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${userToken}`,
          },
          url: request.url,
        });
        return next.handle(newRequest);


      }
      // Use user token if only user token is present
      const newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`,
        },
        url: commonUrl + request.url,
      });
      return next.handle(newRequest);
    } else {
      // No tokens present, use request as-is
      const newRequest = request.clone({
        url: commonUrl + request.url,
      });
      console.log('nouser');

      return next.handle(newRequest);
    }
  }
}
