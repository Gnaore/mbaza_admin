import { Router } from '@angular/router';
import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
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
    private configService: ConfigService,
    private router: Router
  ) { }
  listeBailleur: any[] = [];
  urlg = '';

  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = this.configService.PrimaryWhite;
  public secondaryColour = this.configService.SecondaryGrey;

  ngOnInit(): void {
    this.urlg = this.configService.urlg;
    this.readAllBailleur();
  }

  readAllBailleur() {
    this.loading = true
    this.bailleurService.AllBailleur().subscribe(
      (ret) => {
        this.listeBailleur = ret.data;
        this.loading = false
      },
      (err) => {
        if (err.status) { this.router.navigateByUrl("/auth") }
      }
    );
  }

  supBailleur(id: any, nbre: number) {
    if (nbre > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Vous ne pouvez pas supprimer un bailleur qui a au moins 1 bien",
      });
      return
    }
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
        this.loading = true
        this.bailleurService.supBailleur(id).subscribe(
          (ret) => {
            this.readAllBailleur();
            this.loading = false
          },
          (err) => {
            if (err.error.status === 401) { this.router.navigateByUrl("/auth") }
            this.loading = false
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.statusText,
            });
          }
        )
      }
    });
  }
}
