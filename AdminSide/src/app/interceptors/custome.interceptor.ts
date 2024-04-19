import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CustomeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let newCloneRequest = req.clone();

    // if(localStorage.getItem("authToken")) {
    //   const token = localStorage.getItem("authToken")
    //   console.log(token)
    //   newCloneRequest = req.clone({
    //     setHeaders: {
    //       authorization: token!
    //     }
    //   })
    // }
    console.log(newCloneRequest);
    return next.handle(newCloneRequest);
  }
}
