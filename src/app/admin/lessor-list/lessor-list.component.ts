import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { BailleurService } from 'src/app/services/bailleur.service';

@Component({
  selector: 'app-lessor-list',
  templateUrl: './lessor-list.component.html',
  styleUrls: ['./lessor-list.component.scss'],
})
export class LessorListComponent implements OnInit {
  constructor(
    private bailleurService: BailleurService,
    private configService: ConfigService
  ) {}
  listeBailleur: any[] = [];
  urlg = '';

  ngOnInit(): void {
    this.urlg = this.configService.urlg;
    this.readAllBailleur();
  }

  readAllBailleur() {
    this.bailleurService.AllBailleur().subscribe(
      (ret) => {
        this.listeBailleur = ret.data;
        console.log(this.listeBailleur);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  supBailleur(arg0: any) {
    throw new Error('Method not implemented.');
  }
  getOneBailleur(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
