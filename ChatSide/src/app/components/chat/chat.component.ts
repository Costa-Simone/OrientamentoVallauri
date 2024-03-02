import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  constructor(protected chatService: ChatService) {}

  answerToText: boolean = false;
  textToSend: string = '';

  checkRightClick(event: MouseEvent) {
    event.preventDefault();
    if (event.button === 2) {
      this.answerToText = true;
    }
  }

  sendMessage() {
    this.answerToText = false;
    //funzione che invia la variabile textToSend al server
  }
}
