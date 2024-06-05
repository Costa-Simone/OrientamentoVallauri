import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LabsService } from 'src/app/service/labs.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent  implements OnInit {
  form:FormGroup = new FormGroup({
    "code":new FormControl('',[Validators.required]),
  })

  constructor(protected labService:LabsService,private router:Router,private alertController:AlertController) { }
  

  ngOnInit() {}

  onLog(){
    this.labService.logIn(this.form.get('code')!.value)?.subscribe({
      "next":(data) => {
        console.log(data.Id)
        this.labService.groupId = data.Id
        localStorage.setItem('groupId',data.Id)
        this.router.navigate(['/home'])
      },
      "error":  (e) => {
        this.showAlert()
      }
    })
  }
  async showAlert(){
    let alert = await this.alertController.create({
      message: "Codice ERRATO! Riprova!",
      buttons: ['OK']
    })

    await alert.present()
  }
}
