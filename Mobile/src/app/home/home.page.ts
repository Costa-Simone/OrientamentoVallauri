import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router:Router) {}
  onClick(event:any){
    event.target.fill = "solid";
    event.target.disabled = true;
  }
  onScanning(){
    this.router.navigate(['/home/camera']);
  }
}
