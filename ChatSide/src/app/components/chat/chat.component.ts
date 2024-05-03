import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ADMIN_ID } from '../../../../env';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  constructor(
    protected chatService: ChatService,
    protected socketService: SocketService
  ) {}

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
      }

      this.textContentAnswer = clickedElement.textContent?.trim();
      this.idMessaggioRisposta = clickedElement.dataset['hidden']?.toString()!;
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

      this.socketService.sendMessage(message);

      this.chatService.latestMessages[
        this.chatService.chatList.indexOf(this.chatService.chatOpen)
      ] = message;

      this.textToSend = '';
    }

    this.answerToText = false;
    //funzione che invia la variabile textToSend al server
  }

  findMessageById(id: string) {
    return this.chatService.currentChat.find((msg: any) => msg.Id == id).Testo;
  }
}
