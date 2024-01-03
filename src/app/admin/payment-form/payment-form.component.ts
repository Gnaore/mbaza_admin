import { Component, OnInit, inject } from '@angular/core';
import * as moment from 'moment';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { BailleurService } from 'src/app/services/bailleur.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  rangeDates: Date[] | undefined;
  visible: boolean = false;
  bailleurs: any[] = [];
  paiements: any[] = [];
  selectedBailleur: any;
  activeBailleur: any;
  detailPaiement: any;
  montantTotalParBailleur: number = 0;

  bailleurService = inject(BailleurService);
  configService = inject(ConfigService);
  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = this.configService.PrimaryWhite;
  public secondaryColour = this.configService.SecondaryGrey;
  
  ngOnInit(): void {
    this.listeBailleur();
  }

  listeBailleur() {
    this.bailleurService.AllBailleur().subscribe(response => {
      this.bailleurs = response.data
    });
  }

  paiementParBailleur() {
    this.loading = true;
    this.activeBailleur = this.selectedBailleur;
    const dateStart = moment(this.rangeDates![0]).format('YYYY-MM-DD HH:mm:ss');
    const dateEnd = moment(this.rangeDates![1]).format('YYYY-MM-DD HH:mm:ss');
    const id = this.selectedBailleur.bailleurId;

    const critere = id + ',' + dateStart + ',' + dateEnd;
    this.bailleurService.paiementParBAilleur(critere).subscribe({
      next: (response) => {
        response.data.forEach((paiement: any) => {
          this.montantTotalParBailleur += +paiement.amount;
        });
        console.log(this.montantTotalParBailleur);
        this.paiements = response.data
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log
      }
    });
  }
}
