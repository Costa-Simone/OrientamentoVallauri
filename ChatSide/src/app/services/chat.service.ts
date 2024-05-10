import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private dataStorageService: DataStorageService) {}

  isChatOpen: boolean = false;

  public chatList: string[] = [];
  public currentChat: any = [];
  public messages: any = [];
  public chatOpen: string = '';
  public latestMessages: any;

  async getChatList() {
    return new Promise<void>((resolve, reject) => {
      this.dataStorageService.inviaRichiesta('GET', '/gruppi')?.subscribe({
        next: (data) => {
          let index = 0;
          data['recordset'].forEach((element: any) => {
            this.chatList[index++] = element.Id;
          });
          this.latestMessages = new Array(this.chatList.length);
          resolve();
        },
      });
    });
  }

  async getLastMessage(gruppi: any) {
    return new Promise<void>((resolve, reject) => {
      this.dataStorageService
        .inviaRichiesta('GET', '/ultimiMessaggi', { gruppi })
        ?.subscribe({
          next: (data) => {
            //console.log(this.chatList);
            this.latestMessages = []; // Resetta l'array latestMessages prima di popolarlo
            let i: number = 0;

            this.chatList.forEach((gruppo: any) => {
              // Cerca se l'ID mittente o destinatario è uguale all'ID del gruppo
              if (data[i]) {
                if (
                  data[i].IdMittente == gruppo ||
                  data[i].IdDestinatario == gruppo
                ) {
                  // Se trova una corrispondenza, inserisce il messaggio nell'array latestMessages
                  this.latestMessages.push(data[i]);
                  i++;
                } else {
                  // Se non trova una corrispondenza, inserisce un messaggio di default
                  this.latestMessages.push({
                    Id: 'noId',
                    Testo: 'Nessun messaggio',
                    Orario: '',
                  });
                }
              } else {
                this.latestMessages.push({
                  Id: 'noId',
                  Testo: 'Nessun messaggio',
                  Orario: '',
                });
              }
            });
            //console.log(this.latestMessages);
            resolve();
          },
        });
    });
  }
  /*
  async getLastMessage(gruppi: any) {
    return new Promise<void>((resolve, reject) => {
      this.dataStorageService
        .inviaRichiesta('GET', '/ultimiMessaggi', { gruppi })
        ?.subscribe({
          next: (data) => {
            this.latestMessages = [];
            console.log(data);

            let index: number = 0;
            this.chatList.forEach((element: any) => {
              //element è l'id del gruppo
              if (data[index] == undefined) {
                //se non ci sono messaggi inserisco un messaggio di default
                this.latestMessages.push({
                  Id: 'noId',
                  Testo: 'Nessun messaggio',
                  Orario: 'Nessuna data',
                });
              } else if (
                data[index].IdMittente != element &&
                data[index].IdDestinatario != element
              ) {
                console.log('non sono io');
                this.latestMessages.push({
                  Id: 'noId',
                  Testo: 'Nessun messaggio',
                  Orario: 'Nessuna data',
                });
              } else {
                console.log('sono io');
                this.latestMessages[index] = data[index];
              } //altrimenti inserisco l'ultimo messaggio della chat
              index++;
            });
            console.log(this.latestMessages);
            resolve();
          },
        });
    });
  }
*/
  async getChat(nChat: string) {
    return new Promise<void>((resolve, reject) => {
      let users = { utente1: '000', utente2: nChat };

      this.dataStorageService
        .inviaRichiesta('GET', '/messaggiById', users)
        ?.subscribe({
          next: (data) => {
            this.currentChat = [];
            data['recordset'].forEach((element: any) => {
              this.currentChat.push(element);
            });
          },
        });
      resolve();
    });
  }

  async sendMessage(message: any) {
    //socket per parlare con un server

    return new Promise<void>((resolve, reject) => {
      this.dataStorageService
        .inviaRichiesta('POST', '/nuovoMessaggio', { message })
        ?.subscribe({
          next: async (data) => {
            await this.getChat(this.chatOpen);
          },
        });
      resolve();
    });
  }
}
