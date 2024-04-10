import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private dataStorageService: DataStorageService) {}

  isChatOpen: boolean = false;

  public chatList: any = [];
  public currentChat: any = [];
  public lastMessages: any = [];
  public chatOpen: string = '';

  getChatList() {
    this.dataStorageService.inviaRichiesta('GET', '/all/gruppi')?.subscribe({
      next: (data) => {
        data['recordset'].forEach((element: any) => {
          this.chatList.push(element);
        });
      },
    });
  }

  getLastMessage() {
    /*
    this.dataStorageService
      .inviaRichiesta('GET', '/ultimoMessaggio')
      ?.subscribe({
        next: (data) => {
          console.log(data);
          data['recordset'].forEach((element: any) => {
            this.lastMessages.push(element);
          });
          console.log(this.lastMessages);
        },
      }); */
    this.lastMessages = [
      'ULTIMO MESSAGGIO CHAT 1',
      'ULTIMO MESSAGGIO CHAT 2',
      'ULTIMO MESSAGGIO CHAT 3',
    ]; //mock data
  }

  getChat(nChat: string) {
    let users = { utente1: '000', utente2: nChat };

    this.dataStorageService
      .inviaRichiesta('GET', '/messaggi', users)
      ?.subscribe({
        next: (data) => {
          console.log(data);
          this.currentChat = [];
          data['recordset'].forEach((element: any) => {
            this.currentChat.push(element);
          });
        },
      });
  }

  sendMessage(message: any) {
    this.dataStorageService
      .inviaRichiesta('POST', '/nuovoMessaggio', { message })
      ?.subscribe({
        next: (data) => {
          this.getChat(this.chatOpen);
        },
      });
  }
}
