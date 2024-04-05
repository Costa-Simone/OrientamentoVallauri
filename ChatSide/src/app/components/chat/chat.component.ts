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
  textContentAnswer: string | undefined = '';

  checkRightClick(event: MouseEvent) {
    event.preventDefault();
    if (event.button === 2) {
      this.answerToText = true;
      const clickedElement = event.target as HTMLElement;

      const messageElement = clickedElement.querySelector('.message');

      if (messageElement) {
        this.textContentAnswer = messageElement.innerHTML?.trim();
        console.log(
          "Testo contenuto nell'elemento message:",
          this.textContentAnswer
        );
      }

      /*this.textContentAnswer = clickedElement.textContent?.trim();
      this.idMessaggioRisposta = clickedElement.dataset['hidden']?.toString()!;*/
    }
  }

  sendMessage() {
    if (this.textToSend != '') {
      let message = {
        Testo: this.textToSend,
        IdMittente: '000',
        IdDestinatario: this.chatService.chatOpen,
        IdMessaggioRisposta: this.idMessaggioRisposta,
      };
      this.chatService.sendMessage(message);
      console.log(message);
      this.textToSend = '';
    }

    this.answerToText = false;
    //funzione che invia la variabile textToSend al server
  }

  findMessageById(id: string) {
    return this.chatService.currentChat.find((msg: any) => msg.Id == id).Testo;
  }
}