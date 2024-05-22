import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LabsService } from 'src/app/service/labs.service';

@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.scss'],
})
export class LabDetailComponent  implements OnInit {
  name:string = ""

  constructor(protected route:ActivatedRoute, protected labService:LabsService,private router:Router, private alertController:AlertController ) { }

  ngOnInit() {
    this.route.queryParams.subscribe({
      "next":(data) => {
        this.name = data['name']
      }
    })
  }
  scanCode(){
    this.router.navigate(['/home/camera'])
  }

  async imHere(){
    const alert = await this.alertController.create({
      message: "Sei sicuro di ciò che stai facendo?",
      buttons: ['SI',"NO"]
    })
    const alert2 = await this.alertController.create({
      message: "Sei molto sicuro di ciò che stai facendo?",
      buttons: ['SI',"NO"]
    })

    alert.present().then((data:any) => {
      data.onDidDismiss().then((data:any) => {
        if(data.role == "SI")
          alert2.present().then((data:any) => {
            data.onDidDismiss().then((data:any) => {
              if(data.role == "SI"){
                this.labService.patchLabTime('/orarioEntrata')?.subscribe({
                  "next":(data) => {
                    this.router.navigate(['/home'])
                  },
                  "error":(e) => {
                    console.log(e)
                  }
                })
              }
            })
          })
      })
    })
  }

}
