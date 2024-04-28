import { Component, OnInit, inject } from '@angular/core';
import * as moment from 'moment';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { BailleurService } from 'src/app/services/bailleur.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  rangeDates: Date[] | undefined;
  visible: boolean = false;
  bailleurs: any[] = [];
  paiements: any[] = [];
  selectedBailleur: any;
  activeBailleur: any;
  detailPaiement: any;

  bailleurService = inject(BailleurService);
  configService = inject(ConfigService);

  dateStart = '';
  dateEnd = '';

  totalPaiement = 0;
  totalBailleur = 0;
  totalMbaaza = 0;

  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = this.configService.PrimaryWhite;
  public secondaryColour = this.configService.SecondaryGrey;

  ngOnInit(): void {
    this.listeBailleur();
  }

  listeBailleur() {
    this.bailleurService.AllBailleur().subscribe((response) => {
      this.bailleurs = response.data;
    });
  }

  paiementParBailleur() {
    this.loading = true;
    this.activeBailleur = this.selectedBailleur;
    this.dateStart = moment(this.rangeDates![0]).format('YYYY-MM-DD HH:mm:ss');
    this.dateEnd = moment(this.rangeDates![1]).format('YYYY-MM-DD HH:mm:ss');
    const id = this.selectedBailleur.bailleurId;

    const critere = id + ',' + this.dateStart + ',' + this.dateEnd;
    this.bailleurService.paiementParBAilleur(critere).subscribe({
      next: (response) => {
        this.paiements = response.data;
        this.loading = false;
        this.totalPaiement = this.paiements
          .map((p) => +p.amount)
          .reduce((sum, m) => sum + m);

        this.totalBailleur = Math.round(
          this.totalPaiement -
            (this.totalPaiement * this.selectedBailleur?.bailleurTaux) / 100
        );

        this.totalMbaaza = Math.round(this.totalPaiement - this.totalBailleur);
      },
      error: (err) => {
        this.loading = false;
        console.log;
      },
    });
  }
}
