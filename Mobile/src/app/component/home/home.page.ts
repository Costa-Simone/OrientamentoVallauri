import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LabsService } from '../../service/labs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  constructor(private router:Router, public labsService:LabsService) {
    this.labsService.getLabs(this.labsService.groupId != undefined ? this.labsService.groupId : localStorage.getItem('groupId')!)
    //console.log(this.labsService.labs)
  }

  onClick(){
    this.router.navigate(['/home/details'])
  }

  onLogOut(){
    localStorage.removeItem('groupId')
    this.router.navigate(['/'])
  }
}
