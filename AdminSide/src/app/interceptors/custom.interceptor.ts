import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let newCloneRequest = req.clone();

    if(localStorage.getItem("authToken")) {
      const token = localStorage.getItem("authToken")
      
      newCloneRequest = req.clone({
        setHeaders: {
          authorization: token!
        }
      })
    }
    
    return next.handle(newCloneRequest);
  }
}
