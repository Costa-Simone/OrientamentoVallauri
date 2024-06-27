import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs';
import { LabsService } from 'src/app/service/labs.service';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.scss'],
})
export class LabDetailComponent  implements OnInit{
  name:string = ""

  constructor(protected route:ActivatedRoute, protected labService:LabsService,private router:Router, private alertController:AlertController,private socket:SocketService ) { }

  async ngOnInit() {
    await this.promiseReturn()
    // await this.labService.getOrario() 
  }

  promiseReturn(){
    return new Promise<void>((resolve,reject) => {
      this.router.events.pipe(
        filter((event:any) => event instanceof NavigationEnd)
      ).subscribe(async (event: any) => {
        if (event.urlAfterRedirects.includes('/home/details')) {
          await this.labService.getOrario();
          this.route.queryParams.subscribe({
            "next":(data) => {
              this.name = data['name']
            }
          })
          resolve()
        }
      });
      resolve()
    })
  }
  
  scanCode(){
    this.router.navigate(['/home/camera'])
  }

  async imHere(){
    
    const alert2 = await this.alertController.create({
      message: "Sei molto sicuro di ciò che stai facendo?",
      buttons: [
        {
          text:'SI',
          handler:() => {
            this.labService.patchLabTime('orarioEntrata')?.subscribe({
              "next":(data) => {
                //this.socket.updateLabStatus("OK")
                window.location.href = '/home/home'
              },
              "error":(e) => {
                console.log(e)
              }
            })
          }
        },
        {
          text:'NO'
        }
      ]
    })
    const alert = await this.alertController.create({
      message: "Sei sicuro di ciò che stai facendo?",
      buttons: [
        {
          text:'SI',
          handler:async () => {
            await alert2.present()
          }
        },
        {
          text:'NO'
        }]
    })
    await alert.present()
  }

}
