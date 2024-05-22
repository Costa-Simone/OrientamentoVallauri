import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabsService } from '../../service/labs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  constructor(private router:Router, public labsService:LabsService) {
    this.labsService.getLabs(this.labsService.groupId != undefined ? this.labsService.groupId : localStorage.getItem('groupId')!)
    //console.log(this.labsService.labs)
  }
  ngOnInit(): void {
    this.labsService.orarioPrevistoIngresso = ""
    this.labsService.orarioEffettivoIngresso = ""
    this.labsService.labId = 0
    console.log(this.labsService.labs)
  }

  onClick(orario:string, name:string,id:number, orarioIngresso:string){
    this.labsService.orarioPrevistoIngresso = orario
    this.router.navigate(['/home/details'],{queryParams:{name:name}})
    this.labsService.labId = id
    if(orarioIngresso != "")
      this.labsService.orarioEffettivoIngresso = orarioIngresso
    else
      this.labsService.orarioEffettivoIngresso = ""
  }

  onLogOut(){
    localStorage.removeItem('groupId')
    this.router.navigate(['/'])
  }
}
