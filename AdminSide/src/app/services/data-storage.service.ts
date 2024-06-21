import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  // 10.0.102.85
  // localhost
  private REST_API_SERVER = 'http://80.180.105.71:80/api';

  constructor(private httpClient: HttpClient, private router: Router) {}

  public InviaRichiesta(
    method: string,
    resource: string,
    params: any = {}
  ): Observable<any> | undefined {
    resource = this.REST_API_SERVER + resource;

    switch (method.toLowerCase()) {
      case 'get':
        return this.httpClient
          .get(resource, { params: params, observe: 'response' })
          .pipe(
            map((response: HttpResponse<any>) => {
              const authHeader = response.headers.get('authorization');

              localStorage.setItem('authToken', authHeader!);

              return response.body;
            }),
            catchError((err) => {
              if (err.status == 403) {
                this.router.navigateByUrl('/login');

                Swal.fire({
                  title: 'Errore',
                  text: 'Sessione scaduta, effettua nuovamente il login',
                  icon: 'error',
                });
              }

              return new Observable<never>(); // Return an empty Observable
            })
          );

      case 'delete':
        return this.httpClient
          .delete(resource, { body: params, observe: 'response' })
          .pipe(
            map((response: HttpResponse<any>) => {
              const authHeader = response.headers.get('authorization');

              localStorage.setItem('authToken', authHeader!);

              return response.body;
            }),
            catchError((err) => {
              if (err.status == 403) {
                this.router.navigateByUrl('/login');

                Swal.fire({
                  title: 'Errore',
                  text: 'Sessione scaduta, effettua nuovamente il login',
                  icon: 'error',
                });
              }

              return new Observable<never>(); // Return an empty Observable
            })
          );

      case 'post':
        return this.httpClient
          .post(resource, params, { observe: 'response' })
          .pipe(
            map((response: HttpResponse<any>) => {
              const authHeader = response.headers.get('authorization');

              localStorage.setItem('authToken', authHeader!);

              return response.body;
            }),
            catchError((err) => {
              if (err.status == 403) {
                this.router.navigateByUrl('/login');

                Swal.fire({
                  title: 'Errore',
                  text: 'Sessione scaduta, effettua nuovamente il login',
                  icon: 'error',
                });
              }

              return new Observable<never>(); // Return an empty Observable
            })
          );

      case 'put':
        return this.httpClient
          .put(resource, params, { observe: 'response' })
          .pipe(
            map((response: HttpResponse<any>) => {
              const authHeader = response.headers.get('authorization');

              localStorage.setItem('authToken', authHeader!);

              return response.body;
            }),
            catchError((err) => {
              if (err.status == 403) {
                this.router.navigateByUrl('/login');

                Swal.fire({
                  title: 'Errore',
                  text: 'Sessione scaduta, effettua nuovamente il login',
                  icon: 'error',
                });
              }

              return new Observable<never>(); // Return an empty Observable
            })
          );

      default:
        return undefined;
    }
  }
}
