import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from './chat.service';
import { GruppiService } from './gruppi.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;

  constructor(
    protected chatService: ChatService,
    private gruppiService: GruppiService
  ) {}

  GoOnline() {
    // 10.0.102.85
    // localhost
    this.socket = io('http://82.54.53.212:80/', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });
    this.joinRoom();

    this.socket.emit('online', { id: '000' });

    //  this.socket.on('update', (data: any) => {});
    this.socket.on('RECEIVE-MESSAGE', (data: any) => {
      //non capto l'ulità di questa funzione ma vabbè lasciamola lì
      this.visualizzaMessaggio(data);
    });

    this.socket.on('DELETED-MESSAGE', (data: any) => {
      this.chatService.getChat(this.chatService.chatOpen);

      console.log(this.chatService.latestMessages);
    });

    this.socket.on('INSERTED-MESSAGE', (data: any) => {
      //messaggio inserito nel db --> giusto, ritorna l'ID del messaggio
      console.log(data);

      if (data.IdDestinatario == this.chatService.chatOpen) {
        console.log('entra');
        this.chatService.currentChat.unshift(data);
      }
      console.log(this.chatService.currentChat);

      this.chatService.latestMessages[
        this.chatService.chatList.indexOf(this.chatService.chatOpen)
      ] = data;
    });

    this.socket.on('NEW-MESSAGE', async (data: any) => {
      //messaggio ricevuto
      console.log(data);

      await this.chatService.getLastMessage(this.chatService.chatList); //riguardo perchè è davvero brutto, sembra migo!!!
      console.log(data.IdMittente, this.chatService.chatOpen);
      if (data.IdMittente == this.chatService.chatOpen)
        this.chatService.currentChat.unshift(data);
    });

    this.socket.on('ENTRATA-LAB', async (data: any) => {
      console.log(data);
      await this.gruppiService.GetLaboratori();
      await this.gruppiService.GetOrariByLab(
        this.gruppiService.selectedIndirizzoLab
      );
      console.log(this.gruppiService.orariLab);
    });
  }

  sendMessage(message: any) {
    this.socket.emit('SEND-MESSAGE', message);
  }

  GoOffline() {
    this.socket.disconnect();
  }

  visualizzaMessaggio(data: any) {
    this.chatService.currentChat.unshift(data);
  }

  deleteMessage(id: string, idDestinatario: string) {
    this.socket.emit('DELETE-MESSAGE', { id, idDestinatario });
    this.chatService.currentChat = this.chatService.currentChat.filter(
      (msg: any) => msg.Id != id
    );

    let arr = this.chatService.currentChat.map( (el : any, i : number) => {
      return this.chatService.currentChat[this.chatService.currentChat.length - 1 - i]
    });
    console.log(arr);

    this.chatService.latestMessages[
      this.chatService.chatList.indexOf(this.chatService.chatOpen)
    ] = arr[
      arr.length - 1
    ] || { Id: 'noId', Testo: 'Nessun messaggio', Orario: '' };
  }

  joinRoom() {
    this.socket.emit('JOIN-CHAT', '000');
    this.socket.emit('JOIN-CHAT', '999');
  }
}