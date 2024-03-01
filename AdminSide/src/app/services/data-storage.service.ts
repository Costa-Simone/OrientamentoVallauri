import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private REST_API_SERVER = "http://10.88.201.137:3000/api";

  constructor(private httpClient: HttpClient) { }

  public InviaRichiesta(method:string, resource:string, params:any = {}):Observable<any> | undefined {
    resource = this.REST_API_SERVER + resource

    switch(method.toLowerCase()) {
      case "get":
        return this.httpClient.get(resource, {params: params})

      case "delete":
        return this.httpClient.delete(resource, {body: params})

      case "post":
        return this.httpClient.post(resource, params)
  
      case "put":
        return this.httpClient.put(resource, params)

      default:
        return undefined
    }
  }
}
