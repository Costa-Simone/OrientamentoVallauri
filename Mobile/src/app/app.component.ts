import { Component } from '@angular/core';
import { SocketService } from './service/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private socket: SocketService) {
    this.socket.getPermission()
  }
  
}
