import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST_API_SERVER } from '../../../env';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private REST_API_SERVER = REST_API_SERVER;
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
