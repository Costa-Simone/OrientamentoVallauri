import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  // 10.0.102.85
  // localhost
  private REST_API_SERVER = "http://192.168.1.22:3001/api";

  constructor(private httpClient: HttpClient, private router:Router, private alertController:AlertController) { }

  public InviaRichiesta(method:string, resource:string, params:any = {}):Observable<any> | undefined {
    resource = this.REST_API_SERVER + resource

    switch(method.toLowerCase()) {
      case "get":
        return this.httpClient.get(resource, {params: params, observe: "response"}).pipe(map((response: HttpResponse<any>) => {
          const authHeader = response.headers.get("authorization")
          
          localStorage.setItem("authToken", authHeader!)

          return response.body
        }), catchError(async (err) => {
          if(err.status == 403) {
            this.router.navigateByUrl("/login")
  
            const alert = await this.alertController.create({
              header: "Errore",
              message: "Sessione scaduta, effettua nuovamente il login",
              buttons: [
                {
                  text:'OK',
                }
              ]
            })
            await alert.present()
          }

          return new Observable<never>(); // Return an empty Observable
        }))

      case "delete":
        return this.httpClient.delete(resource, {body: params, observe: "response"}).pipe(map((response: HttpResponse<any>) => {
          const authHeader = response.headers.get("authorization")
          
          localStorage.setItem("authToken", authHeader!)

          return response.body
        }), catchError(async (err) => {
          if(err.status == 403) {
            this.router.navigateByUrl("/login")
  
            const alert = await this.alertController.create({
              header: "Errore",
              message: "Sessione scaduta, effettua nuovamente il login",
              buttons: [
                {
                  text:'OK',
                }
              ]
            })
            await alert.present()
          }

          return new Observable<never>(); // Return an empty Observable
        }))

      case "post":
        return this.httpClient.post(resource, params, { observe: "response" }).pipe(map((response: HttpResponse<any>) => {
          const authHeader = response.headers.get("authorization")
          
          localStorage.setItem("authToken", authHeader!)

          return response.body
        }), catchError(async (err) => {
          if(err.status == 403) {
            this.router.navigateByUrl("/login")
  
            const alert = await this.alertController.create({
              header: "Errore",
              message: "Sessione scaduta, effettua nuovamente il login",
              buttons: [
                {
                  text:'OK',
                }
              ]
            })
            await alert.present()
          }

          return new Observable<never>(); // Return an empty Observable
        }))
  
      case "put":
        return this.httpClient.put(resource, params, { observe: "response" }).pipe(map((response: HttpResponse<any>) => {
          const authHeader = response.headers.get("authorization")
          
          localStorage.setItem("authToken", authHeader!)

          return response.body
        }), catchError(async (err) => {
          if(err.status == 403) {
            this.router.navigateByUrl("/login")
  
            const alert = await this.alertController.create({
              header: "Errore",
              message: "Sessione scaduta, effettua nuovamente il login",
              buttons: [
                {
                  text:'OK',
                }
              ]
            })
            await alert.present()
          }

          return new Observable<never>(); // Return an empty Observable
        }))

      default:
        return undefined
    }
  }
}