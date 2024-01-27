import { Component, OnInit } from '@angular/core';
import { ROLE } from 'src/app/enum/role.enum';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  userConnect = [];
  utilisateur: string = "";
  userRole!: string;
  userPhoto!: string;
  userQrcode!: string;
  role = ROLE;

  constructor(private authService: AuthService, private confService: ConfigService) {}
  urlg: string = this.confService.urlg

  ngOnInit(): void {
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.utilisateur = userConnect.user.username;
    this.userRole = userConnect.user.userrole;
    this.userPhoto = userConnect.user.userPhoto;
    this.userQrcode = userConnect.user.userQrCode;
  }
  logout() {
    this.authService.logout();
  }
}
