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
      const messageElement = (event.target as HTMLElement).closest('#msg');

      if (messageElement) {
        this.textContentAnswer = messageElement.innerHTML?.trim();
        console.log('Testo contenuto nel messaggio:', this.textContentAnswer);
      }

      this.textContentAnswer = clickedElement.textContent?.trim();
      this.idMessaggioRisposta = clickedElement.dataset['hidden']?.toString()!;
      console.log('Id messaggio risposta:', this.idMessaggioRisposta);
    }
  }

  async sendMessage() {
    if (this.textToSend != '') {
      let message = {
        Testo: this.textToSend,
        IdMittente: '000',
        IdDestinatario: this.chatService.chatOpen,
        IdMessaggioRisposta: this.idMessaggioRisposta,
      };
      await this.chatService.sendMessage(message);
      await this.chatService.getLastMessage(this.chatService.chatList);
      this.textToSend = '';
    }

    this.answerToText = false;
    //funzione che invia la variabile textToSend al server
  }

  findMessageById(id: string) {
    return this.chatService.currentChat.find((msg: any) => msg.Id == id).Testo;
  }
}
