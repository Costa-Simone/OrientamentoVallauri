import { Component, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  idAdmin: string = '000';

  constructor(
    protected chatService: ChatService,
    protected socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) {}

  answerToText: boolean = false;
  textToSend: string = '';
  idMessaggioRisposta: string = '';
  textContentAnswer: string | undefined = '';

  checkRightClick(event: MouseEvent) {
    event.preventDefault();
    if (event.button === 2) {
    }
  }

  async sendMessage() {
    if (this.textToSend != '') {
      let message = {
        Testo: this.textToSend,
        IdMittente: '000',
        IdDestinatario: this.chatService.chatOpen,
        IdMessaggioRisposta: this.idMessaggioRisposta,
      };

      console.log(this.chatService.chatOpen);

      this.socketService.sendMessage(message);

      this.chatService.latestMessages[
        this.chatService.chatList.indexOf(this.chatService.chatOpen)
      ] = message;

      this.textToSend = '';
    }

    this.answerToText = false;
    //funzione che invia la variabile textToSend al server
  }

  findMessageById(id: string) {
    return this.chatService.currentChat.find((msg: any) => msg.Id == id).Testo;
  }

  setAsAnswerMessage(messageId: any) {
    this.answerToText = true;
    this.idMessaggioRisposta = messageId;
  }

  deleteMessage(messageId: any) {
    Swal.fire({
      title: 'Confermi di voler eliminare il messaggio?',
      text: 'Una volta eliminato, non sarà più visibile per nessuno e non sarà possibile recuperarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'No, annulla',
    }).then((result) => {
      if (result.isConfirmed) {
        //del
        console.log(messageId);
        this.socketService.deleteMessage(messageId, this.chatService.chatOpen);
      }
    });
  }
}
