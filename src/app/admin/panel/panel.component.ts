import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  userConnect = [];
  utilisateur: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.utilisateur = userConnect.user.username;
  }
  logout() {
    this.authService.logout();
  }
}
