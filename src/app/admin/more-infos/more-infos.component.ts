import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { BailleurService } from 'src/app/services/bailleur.service';
import { ConfigService } from 'src/app/services/config.service';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-more-infos',
  templateUrl: './more-infos.component.html',
  styleUrls: ['./more-infos.component.scss']
})
export class MoreInfosComponent implements OnInit {
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private bailleurService: BailleurService,
    private configService: ConfigService
  ) { }

  id: any
  codeBailleur: any
  nbrPropriete: number | undefined
  nbrLocataire: number | undefined
  listpayement: any[] | undefined
  listpropriete: any[] | undefined
  listlocataire: any[] | undefined

  qrcode = "";
  url = this.configService.urlFront

  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = this.configService.PrimaryWhite;
  public secondaryColour = this.configService.SecondaryGrey;

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get('id')
    //  this.getOneBailleur(this.id)
    this.allpayementbyBailleur(this.id)
  }

  goTo() {
    this.router.navigate(['/admin/lessor-manager']);
  }

  getOneBailleur(id: any) {
    this.loading = true
    this.bailleurService.onebailleur(id).subscribe(rep => {
      this.codeBailleur = rep.data.bailleurNumero
      this.nbrPropriete = rep.data.proprietes.length

      this.loading = false

    }, (err) => {
      if (err.status === 401) {
        this.router.navigateByUrl("/auth")
      }
    })
  }

  allpayementbyBailleur(id: any) {
    this.loading = true
    this.bailleurService.allpayementbyBailleur(id).subscribe(rep => {

      this.codeBailleur = rep.data[0].bailleurNumero
      this.nbrPropriete = rep.data[0].proprietes.length
      this.nbrLocataire = rep.data[0].locataires.length
      this.listpayement = rep.data[0].wcallbacks
      this.listlocataire = rep.data[0].locataires
      this.loading = false

    }, (err) => {
      if (err.status === 401) {
        this.router.navigateByUrl("/auth")
      }
      this.loading = false
    })
  }


  getAllPropriete(id: any) {
    this.loading = true
    this.bailleurService.allProprieteBailleur(id).subscribe(rep => {
      this.listpropriete = rep.data
      this.loading = false
    }, (err) => {
      if (err.error.status == 401) { this.router.navigateByUrl("/auth") }
    });
  }
}
