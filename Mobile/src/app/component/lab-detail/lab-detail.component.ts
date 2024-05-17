import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LabsService } from 'src/app/service/labs.service';

@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.scss'],
})
export class LabDetailComponent  implements OnInit {
  name:string = ""

  constructor(protected route:ActivatedRoute, protected labService:LabsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe({
      "next":(data) => {
        this.name = data['name']
      }
    })
  }

}
