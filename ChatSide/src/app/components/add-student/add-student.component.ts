import { Component } from '@angular/core';
import { GruppiService } from '../../services/gruppi.service';
import { MatDialog } from '@angular/material/dialog';
import { Studente } from '../../models/studente.module';
import { StudentiService } from '../../services/studenti.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  nominativo:string = ""
  scuola:string = ""
  gruppoITIS:string = ""
  gruppoLICEO:string = ""
  gruppoAFM:string = ""

  constructor(public gruppiService:GruppiService, private dialog:MatDialog, private studentiService:StudentiService) {}

  ngOnInit() {
    if(this.gruppiService.gruppi.length == 0) {
      this.gruppiService.GetGruppi()
    }
  }
  
  SaveStudent() {
    let student:Partial<Studente> = {
      Nominativo: this.nominativo,
      ScuolaProvenienza: this.scuola,
      SlotITI: this.gruppoITIS == "" ? "-" : this.gruppoITIS,
      SlotLICEO: this.gruppoLICEO == "" ? "-" : this.gruppoLICEO,
      SlotAFM: this.gruppoAFM == "" ? "-" : this.gruppoAFM
    }

    this.studentiService.AddStudent(student)
  }
 
  CloseDialog() {
    this.dialog.closeAll()
  }
}
