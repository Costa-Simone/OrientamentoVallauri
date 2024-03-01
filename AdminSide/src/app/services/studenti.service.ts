import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentiService {
  studenti: any[] = []
  selectedStudente: any = null;

  constructor() { }

  GetStudenti() {
    this.studenti = []
  }
}
