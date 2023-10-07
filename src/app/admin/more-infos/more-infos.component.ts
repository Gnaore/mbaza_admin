import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-infos',
  templateUrl: './more-infos.component.html',
  styleUrls: ['./more-infos.component.scss']
})
export class MoreInfosComponent {
  constructor(
    private router: Router
  ) {}
  
  goTo(path: string) {
    this.router.navigate(['/admin/' + path]);
  }
}
