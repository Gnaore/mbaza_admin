import { Component, OnInit, inject } from '@angular/core';
import { BailleurService } from 'src/app/services/bailleur.service';
import { ConfigService } from 'src/app/services/config.service';
import { LocataireService } from 'src/app/services/locataire.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
})
export class TenantComponent implements OnInit {
  locataireService = inject(LocataireService);
  urlimg = inject(ConfigService).urlgimg;
  listeLocatire: any;
  listeLocatireFiltre: any;
  selectBailleur = '';

  bailleurService = inject(BailleurService);
  listeBailleur: any;

  ngOnInit(): void {
    this.allLocataire();
    this.allBailleur();
  }

  allBailleur() {
    this.bailleurService.AllBailleur().subscribe((ret) => {
      this.listeBailleur = ret.data;
    });
  }

  allLocataire() {
    this.locataireService.allLocataire().subscribe((ret) => {
      this.listeLocatire = ret.data;
      this.listeLocatireFiltre = ret.data;
    });
  }

  filtreBailleur(bailleur: string) {
    if (bailleur == '') {
      this.listeLocatireFiltre = this.listeLocatire;
      return;
    }

    this.listeLocatireFiltre = this.listeLocatire;
    this.listeLocatireFiltre = this.listeLocatire.filter(
      (locataire: any) => locataire.bailleur.bailleurNomPrenoms == bailleur
    );
  }

  back() {
    history.back();
  }
}
