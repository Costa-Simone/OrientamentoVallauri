import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private dataStorageService: DataStorageService) {}

  isChatOpen: boolean = false;
  private groupList: any;
  public chatList: any = [];

  getChatList() {
    this.dataStorageService.inviaRichiesta('GET', '/gruppi')?.subscribe({
      next: (data) => {
        console.log(data);
        data['recordset'].forEach((element: any) => {
          this.chatList.push(element);
        });

        console.log(this.chatList);
      },
    });
  }

  sendMessage(message: any) {
    this.dataStorageService.inviaRichiesta('POST', '/sendMessage', message);
  }
}
