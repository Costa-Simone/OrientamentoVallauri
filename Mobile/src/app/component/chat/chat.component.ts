import { group } from '@angular/animations';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    protected socketService: SocketService,
    protected router: Router
  ) {}

  idAdmin: string = '000';
  textToSend: string = '';
  idMessaggioRisposta: string = '';
  answerToText: boolean = false;

  async ngOnInit() {
    if(!this.chatService.groupId) {
      this.chatService.groupId = localStorage.getItem('groupId')!;
    }
    this.chatService.chatOpened = this.router.url.split('/')[3];


    await this.chatService.getChat();
    
    this.socketService.GoOnline();
    this.socketService.joinRoom();
    

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
      this.chatService.currentChat.unshift(message);
      this.textToSend = '';
    }

    this.answerToText = false;
    //funzione che invia la variabile textToSend al server
  }
}