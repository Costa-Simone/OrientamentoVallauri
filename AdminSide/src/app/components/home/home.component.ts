import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { Notifica } from '../../models/notifica.module';
import { NotificheService } from '../../services/notifiche.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isOnline: boolean = false;
  constructor(private router: Router, private socketService: SocketService) {}

  ngOnInit() {
    if (!this.isOnline) {
      this.socketService.GoOnline();
      this.isOnline = true;
    }
  }

  Logout() {
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('/login');
  }
}
