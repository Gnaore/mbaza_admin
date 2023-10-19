import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { BailleurService } from 'src/app/services/bailleur.service';
import Swal from 'sweetalert2';

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

  supBailleur(id: any) {
    Swal.fire({
      title: 'Etes-vous vraiment certain ?',
      text: 'Cet enregistrement sera supprimé !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bailleurService.supBailleur(id).subscribe(
          (ret) => {
            this.readAllBailleur();
          }, 
          (err) => {
            console.log(err.error.message);
          }
        )
      }
    });
  }
}
