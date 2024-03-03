import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const { Camera } = Plugins;


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})

export class CameraComponent implements OnInit{
  scannedCode: string = '';

  constructor(private router:Router) {
    //this.scanCode();
  }
  
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.urlAfterRedirects === '/home/camera') {
        this.scanCode();
      }
    });
  }
  async scanCode() {
    const image = await Camera['getPhoto']({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    // Process the captured image here
    // You might want to decode the QR code using a library like ngx-qrcode2 or @zxing/library
    // For example:
    this.scannedCode = await this.decodeQRCode(image.base64String!);
  }

  async decodeQRCode(base64String: string): Promise<string> {
    // Implement QR code decoding logic here using your preferred library
    // For example, using @zxing/library:
    return new Promise<string>((resolve, reject) => {
      // Decode QR code
      // Example usage:
      // const reader = new ZXing.BrowserQRCodeReader();
      // reader.decodeFromImage(undefined, base64String, (result: ZXing.Result, error: any) => {
      //   if (result) {
      //     resolve(result.getText());
      //   } else {
      //     reject(error);
      //   }
      // });
    });
  }

}
