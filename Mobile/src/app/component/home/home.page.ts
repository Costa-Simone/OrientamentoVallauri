import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LabsService } from '../../service/labs.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  constructor(private router:Router, public labsService:LabsService) {
    
    //console.log(this.labsService.labs)
  }
  ngOnInit(): void {
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.urlAfterRedirects === '/home/home') {
        this.labsService.getLabs(this.labsService.groupId != undefined ? this.labsService.groupId : localStorage.getItem('groupId')!)
        this.labsService.orarioPrevistoIngresso = ""
        this.labsService.orarioEffettivoIngresso = ""
        this.labsService.labId = 0
        console.log(this.labsService.labs)
      }
    });
  }

  onClick(name:string, id:number){
    this.router.navigate(['/home/details'],{queryParams:{name:name}})
    console.log(id)
    this.labsService.labId = id
  }

  onLogOut(){
    localStorage.removeItem('groupId')
    // this.router.navigate(['/'])
    window.location.href = '/'
  }
}
