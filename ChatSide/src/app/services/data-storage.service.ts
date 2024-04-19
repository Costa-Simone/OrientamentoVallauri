import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private REST_API_SERVER = 'http://10.88.231.147:3000/api';
  constructor(private httpClient: HttpClient) {}

  public inviaRichiesta(
    method: string,
    resource: string,
    params: any = {}
  ): Observable<any> | undefined {
    resource = this.REST_API_SERVER + resource;
    console.log(resource);
    switch (method.toLowerCase()) {
      case 'get':
        return this.httpClient.get(resource, { params: params });
        break;
      case 'delete':
        return this.httpClient.delete(resource, { body: params });
        break;
      case 'post':
        return this.httpClient.post(resource, params);
        break;
      case 'patch':
        return this.httpClient.patch(resource, params);
        break;
      case 'put':
        return this.httpClient.put(resource, params);
        break;
      default:
        return undefined;
        break;
    }
  }
}
