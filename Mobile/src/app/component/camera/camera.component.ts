import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { SocketService } from 'src/app/service/socket.service';
import { LabsService } from 'src/app/service/labs.service';
import { AlertController } from '@ionic/angular';

const { Camera } = Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})

export class CameraComponent implements OnInit{
  scannedCode: string = '';
  text:string = ""

  constructor(private router:Router, private socket:SocketService, private labsService:LabsService,private alertController:AlertController) {}
  
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.urlAfterRedirects === '/home/camera') {
        this.decodeQRCode();
      }
    });
  }

  async decodeQRCode() {
    document.getElementById('container')!.innerHTML = '';
    const codeReader = new BrowserMultiFormatReader();
    const alert = await this.alertController.create({
      message: "Posizione registrata correttamente",
      buttons: [
        {
          text:'OK',
          handler:() => {
            window.location.href = '/home/home'
          }
        }
    ]
    })

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment' // Utilizza la fotocamera posteriore
            }
        });

        const videoElement = document.createElement('video');
        videoElement.style.width = '100%'
        videoElement.style.height = '100%'
        document.getElementById('container')!.appendChild(videoElement);
        videoElement.srcObject = stream;
        videoElement.play();

        // Decodifica il flusso video dalla fotocamera
        codeReader.decodeFromVideoElement(videoElement).then((result) => {
            if (result) {
                console.log('Risultato della scansione:', result.getText());
                // const p = document.createElement('p');
                // p.innerText = result.getText();
                // document.getElementById('container')!.appendChild(p);
                this.scannedCode = result.getText();
                console.log(this.scannedCode);
                //TODO rechiesta da mandare al server con dati labortori e cod Gruppo, alla risposta del server far partire il socket che comunica con il lato admin
                //this.scannedCode = "http://nomeBoh.aaa/api/richiesta"
                this.labsService.patchLabTime(this.scannedCode.split('/api/')[1])?.subscribe({
                  "next":async(data) => {
                    console.log(data)
                    await alert.present()
                  },
                  "error": (e) => {
                    console.log(e)
                  }
                })
            }
          }).catch((error) => {
            if (error && !(error instanceof NotFoundException)) {
                console.error('Errore durante la scansione:', error);
            }
          });
    } catch (error) {
        console.error('Errore durante l\'accesso alla fotocamera:', error);
    }
  }
}
