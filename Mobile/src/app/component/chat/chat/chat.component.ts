import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    protected chatService: ChatService,
    protected dataStorageService: DataStorageService,
    protected socketService: SocketService
  ) {}

  idAdmin: string = '000';
  textToSend: string = '';
  idMessaggioRisposta: string = '';
  answerToText: boolean = false;

  async ngOnInit() {
    this.socketService.GoOnline();
    this.socketService.joinRoom();
    await this.chatService.getChat(this.chatService.groupId);
  }

  sendMessage() {
    if (this.textToSend != '') {
      let message = {
        Testo: this.textToSend,
        IdMittente: this.chatService.groupId,
        IdDestinatario: '000',
        IdMessaggioRisposta: this.idMessaggioRisposta,
      };

      this.socketService.sendMessage(message);
      this.chatService.currentChat.push(message);
      this.textToSend = '';
    }

    this.answerToText = false;
    //funzione che invia la variabile textToSend al server
  }
}
