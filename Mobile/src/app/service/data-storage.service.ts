import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private REST_API_SERVER = 'http://79.25.227.23:80/api';

  constructor(private httpClient: HttpClient) {}

  public InviaRichiesta(
    method: string,
    resource: string,
    params: any = {}
  ): Observable<any> | undefined {
    resource = this.REST_API_SERVER + resource;

    switch (method.toLowerCase()) {
      case 'get':
        return this.httpClient.get(resource, { params: params });

      case 'delete':
        return this.httpClient.delete(resource, { body: params });

      case 'post':
        return this.httpClient.post(resource, params);

      case 'put':
        return this.httpClient.put(resource, params);

      case 'login':
        return this.httpClient
          .post(resource, params, { observe: 'response' })
          .pipe(
            map((response: HttpResponse<any>) => {
              const authHeader = response.headers.get('authorization');

              localStorage.setItem('authToken', authHeader!);

              return response.body;
            })
          );

      default:
        return undefined;
    }
  }
}
