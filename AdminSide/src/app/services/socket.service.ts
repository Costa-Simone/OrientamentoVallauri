import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from './chat.service';
import { GruppiService } from './gruppi.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;

  constructor(protected chatService: ChatService, private gruppiService:GruppiService) {}

  GoOnline() {
    // 10.0.102.85
    // localhost
    this.socket = io('http://localhost:3000', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });
    
    this.socket.emit('online', { id: '000' });

    //  this.socket.on('update', (data: any) => {});
    this.socket.on('RECEIVE-MESSAGE', (data: any) => {
      this.visualizzaMessaggio(data);
    });

    this.socket.on('DELETED-MESSAGE', (data: any) => {
      this.chatService.currentChat = this.chatService.currentChat.filter(
        (msg: any) => msg.Id != data
      );

      this.chatService.latestMessages[
        this.chatService.chatList.indexOf(this.chatService.chatOpen)
      ] = this.chatService.currentChat[
        this.chatService.currentChat.length - 1
      ] || { Id: 'noId', Testo: 'Nessun messaggio', Orario: '' };
      console.log(this.chatService.latestMessages);
    });

    this.socket.on('INSERTED-MESSAGE', (data: any) => {
      //messaggio inserito nel db
      console.log(data);
      this.chatService.currentChat.push(data);
      this.chatService.latestMessages[
        this.chatService.chatList.indexOf(this.chatService.chatOpen)
      ] = data;
    });

    this.socket.on('NEW-MESSAGE', async (data: any) => {
      console.log(data);
      await this.chatService.getLastMessage(this.chatService.chatList); //riguardo perchè è davvero brutto, sembra migo!!!
      console.log(data.IdMittente, this.chatService.chatOpen);
      if (data.IdMittente == this.chatService.chatOpen)
        this.chatService.currentChat.push(data);
    });

    this.socket.on("ENTRATA-LAB", async (data: any) => {
      console.log(data)
      await this.gruppiService.GetLaboratori()
      await this.gruppiService.GetOrariByLab(this.gruppiService.selectedIndirizzoLab)
      console.log(this.gruppiService.orariLab)
    })
  }

  sendMessage(message: any) {
    this.socket.emit('SEND-MESSAGE', message);
  }

  GoOffline() {
    this.socket.disconnect();
  }

  visualizzaMessaggio(data: any) {
    this.chatService.currentChat.push(data);
  }

  deleteMessage(id: string, idDestinatario: string) {
    this.socket.emit('DELETE-MESSAGE', { id, idDestinatario });
  }

  joinRoom() {
    this.socket.emit('JOIN-CHAT', '000');
  }
}
