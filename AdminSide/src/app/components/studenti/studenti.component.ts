import { Component } from '@angular/core';
import { StudentiService } from '../../services/studenti.service';
import * as XLSX from 'xlsx';
import { Studente } from '../../models/studente.module';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrl: './studenti.component.css'
})
export class StudentiComponent {

  constructor(public studentiService: StudentiService, private dialog:MatDialog) { }

  DeleteStudents() {
    this.studentiService.DeleteStudenti()
  }

  AddStudent() {
    this.dialog.open(AddStudentComponent)
  }
  
  AddStudents() {
    this.studentiService.AddStudents(this.studentiService.importedStudents)
    this.studentiService.importedStudents = []
    this.studentiService.groups = []
  }

  OnFileChange(event: any) {
    this.studentiService.importedStudents = []
    this.studentiService.groups = []
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // console.log(XLSX.utils.sheet_to_json(ws))
      /* save data */
      (document.getElementById('inputFileStudenti') as HTMLInputElement).value = ""
      this.CreateStudents(XLSX.utils.sheet_to_json(ws)) // to get 2d array pass 2nd parameter as object {header: 1}
    };
  }

  CreateStudents(students: any) {
    students.forEach((student: any) => {
      if(student["STUDENTE"] != "Cognome e nome del ragazzo") {
        let stud:Partial<Studente> = {
          Nominativo: student["STUDENTE"],
          ScuolaProvenienza: student["Scuola media di provenienza"],
          SlotITI: student["SLOT \r\nITI"],
          SlotLICEO: student["SLOT \r\nLICEO"],
          SlotAFM: student["SLOT \r\nAFM"],
          isPresente: 0
        }

        if(!this.studentiService.groups.includes(student["SLOT \r\nITI"])) {
          this.studentiService.groups.push(student["SLOT \r\nITI"])
        }

        this.studentiService.importedStudents.push(stud)
      }
    });
  }
}
