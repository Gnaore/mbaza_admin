import { Component, OnInit } from '@angular/core';
import { ROLE } from 'src/app/enum/role.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  userConnect = [];
  utilisateur: string = "";
  userRole!: string;
  role = ROLE;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userConnect = JSON.parse(localStorage.getItem('currentUser')!);
    this.utilisateur = userConnect.user.username;
    this.userRole = userConnect.user.userrole;
  }
  logout() {
    this.authService.logout();
  }
}
