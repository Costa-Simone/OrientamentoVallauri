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
  public messages: any = [];
  public chatOpen: string = '';
  public latestMessages: any[] = [];

  getChatList() {
    this.dataStorageService.inviaRichiesta('GET', '/gruppi')?.subscribe({
      next: (data) => {
        data['recordset'].forEach((element: any) => {
          this.chatList.push(element);
        });
      },
    });
  }

  getLastMessage() {
    this.dataStorageService.inviaRichiesta('GET', '/messaggi')?.subscribe({
      next: (data) => {
        let currentUser = data['recordset'][0].IdDestinatario;
        console.log(this.latestMessages[0]);

        data['recordset'].forEach((element: any) => {
          this.messages.push(element);
          if (element.IdDestinatario != currentUser) {
            currentUser = element.IdDestinatario;
          }
        });

        console.log(this.messages);
        console.log(this.latestMessages);
      },
    });

    this.messages.forEach((messaggio: any) => {});
  }

  getChat(nChat: string) {
    let users = { utente1: '000', utente2: nChat };

    this.dataStorageService
      .inviaRichiesta('GET', '/messaggiById', users) //devo ricordarmi di dire a pizz di rinominare la app.get da messaggi a messaggiById
      ?.subscribe({
        next: (data) => {
          this.currentChat = [];
          data['recordset'].forEach((element: any) => {
            this.currentChat.push(element);
          });
          console.log(this.currentChat);
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
