import { group } from '@angular/animations';
import { Component, ElementRef, OnInit , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { IonPopover } from '@ionic/angular';
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

  answerToTextMessage : any = {
    Boolean: false,
    Id: 0,
    Message: ''
  }

  async ngOnInit() {
    if (!this.chatService.groupId) {
      this.chatService.groupId = localStorage.getItem('groupId')!;
    }
    this.chatService.chatOpened = this.router.url.split('/')[3];


    await this.chatService.getChat();
    
    this.socketService.GoOnline();
  }

  sendMessage() {
    if (this.textToSend != '') {
      let message = {
        Testo: this.textToSend,
        IdMittente: this.chatService.groupId,
        IdDestinatario: '000',
        IdMessaggioRisposta: this.answerToTextMessage.Id,
      };

      this.socketService.sendMessage(message);
      this.chatService.currentChat.unshift(message);
      this.textToSend = '';
    }

    this.answerToTextMessage = {
      Boolean: false,
      Id: 0,
      Message: ''
    }
    //funzione che invia la variabile textToSend al server
  }

  findMessageById(message: any) {
    if( this.chatService.currentChat.find((mex : any) => mex.Id == message.IdMessaggioRisposta) != undefined) {
      return this.chatService.currentChat.find((mex : any) => mex.Id == message.IdMessaggioRisposta).Testo;
    }
    else {
      this.chatService.currentChat.find((mex : any) => mex.Id == message.Id).IdMessaggioRisposta = undefined;
      return '';
    }
  }

  checkAnswer(message : any) {
    if (this.answerToTextMessage.Id == message.Id) {
      this.answerToTextMessage = {
        Boolean: false,
        Id: 0,
        Message: '',
      };
    } else {
      this.answerToTextMessage.Id = message.Id;
      this.answerToTextMessage.Message = message.Testo;
      this.answerToTextMessage.Boolean = true;
    }
  }

  resetRooms() {
    if(this.chatService.chatOpened == "000")
      this.socketService.leaveRoom(this.chatService.groupId);
    else
      this.socketService.leaveRoom('999');
  }
}