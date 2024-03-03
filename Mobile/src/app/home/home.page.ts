import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}
  onClick(event:any){
    event.target.fill = "solid";
    event.target.disabled = true;
  }
}
