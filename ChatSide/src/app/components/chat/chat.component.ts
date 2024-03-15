import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ADMIN_ID } from '../../../../env';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  constructor(protected chatService: ChatService) {}

  idAdmin = ADMIN_ID;
  answerToText: boolean = false;
  textToSend: string = '';
  idMessaggioRisposta: string = '';

  checkRightClick(event: MouseEvent) {
    event.preventDefault();
    if (event.button === 2) {
      this.answerToText = true;
      //funzione che setta idMessaggioRisposta dopo il click destro
    }
  }

  sendMessage() {
    if (this.textToSend != '') {
      let message = {
        text: this.textToSend,
        idMittente: '',
        idDestinatario: '',
        Orario: '',
        Data: '',
        idMessaggioRisposta: this.idMessaggioRisposta,
      };
      this.chatService.sendMessage(message);
    }

    this.answerToText = false;
    //funzione che invia la variabile textToSend al server
  }
}
