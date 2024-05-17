import {
  Component,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ADMIN_ID } from '../../../../../../env';
import { SocketService } from '../../services/socket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements AfterViewChecked {
  constructor(
    protected chatService: ChatService,
    protected socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  idAdmin = ADMIN_ID;
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
        this.socketService.deleteMessage(messageId);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
    this.cdr.detectChanges();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom failed', err);
    }
  }
}
