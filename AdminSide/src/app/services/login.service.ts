import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginObj = {
    username: "",
    password: ""
  }
  
  constructor(private dataStorage:DataStorageService, private router:Router) { }

  Login() {
    this.dataStorage.InviaRichiesta("post", "/loginAdmin", this.loginObj)?.subscribe({
      next: data => {
        this.loginObj.username = ""
        this.loginObj.password = ""
        this.router.navigateByUrl("/home")
      },
      error: errore => {
        Swal.fire({
          title: 'Errore!',
          text: errore.error,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    })
  }
}
