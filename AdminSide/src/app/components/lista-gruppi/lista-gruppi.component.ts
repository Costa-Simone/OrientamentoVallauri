import { Component } from '@angular/core';
import { GruppiService } from '../../services/gruppi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-gruppi',
  templateUrl: './lista-gruppi.component.html',
  styleUrl: './lista-gruppi.component.css'
})
export class ListaGruppiComponent {
  selectedIndirizzo:string = "C"

  constructor(private router:Router, public gruppiService:GruppiService) {}

  ngOnInit() {
    this.gruppiService.GetGruppi()
  }

  OnGruppoClick(gruppo:any) {
    this.gruppiService.selectedGruppo = gruppo
    this.router.navigateByUrl(`/home/${this.gruppiService.selectedGruppo!["Id"]}/detail`)
  }
}
