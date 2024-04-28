import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BailleurService } from 'src/app/services/bailleur.service';
import { BienService } from 'src/app/services/bien.service';
import { LocataireService } from 'src/app/services/locataire.service';
import { PaiementService } from 'src/app/services/paiement.service';
import { ProprieteService } from 'src/app/services/propriete.service';

interface paiement {
  amount: number;
  when_completed: string;
  bailleurTaux: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  doughnutSource!: Object;
  barSource!: Object;
  pieSource!: Object;
  lineSource!: Object;

  biens!: any[];
  proprietes!: any[];
  bailleurs!: any[];
  locataires!: any[];

  nbreBiens = 0;
  nbreBiensLoue = 0;
  nbreBiensAchete = 0;
  nbreBiensDisponible = 0;

  nbreBiensP = 0;
  nbreBiensLoueP = 0;
  nbreBiensAcheteP = 0;
  nbreBiensDisponibleP = 0;

  nbreProprietes = 0;
  nbreBailleurs = 0;
  nbreLocataires = 0;
  totalRevenu = 0;

  locataireService = inject(LocataireService);
  router = inject(Router);
  bienservices = inject(BienService);
  proprieteService = inject(ProprieteService);
  bailleurService = inject(BailleurService);
  paiementService = inject(PaiementService);
  paiements!: any[];
  paiementsFiltre!: any[];

  ngOnInit() {
    this.allBien();
    this.allPropriete();
    this.allBailleur();
    this.allLocataire();
    this.allPaiement();
  }

  goTo(path: string) {
    this.router.navigate(['/admin/' + path]);
  }

  allBailleur() {
    this.bailleurService.AllBailleur().subscribe((ret) => {
      this.bailleurs = ret.data;
      this.nbreBailleurs = this.bailleurs.length;
    });
  }

  allPropriete() {
    this.proprieteService.AllPropriete().subscribe((ret) => {
      this.proprietes = ret.data;
      this.nbreProprietes = this.proprietes.length;
    });
  }

  allBien() {
    this.bienservices.AllBien().subscribe((ret) => {
      this.biens = ret.data;
      console.log(this.biens);

      this.nbreBiens = this.biens.length;
      this.nbreBiensP = this.pourcentageRetour(this.nbreBiens, this.nbreBiens);

      this.nbreBiensLoue = this.biens.filter(
        (bien) => bien.bienCategorie == 'Location' && bien.bienOqp == true
      ).length;
      this.nbreBiensLoueP = this.pourcentageRetour(
        this.nbreBiensLoue,
        this.nbreBiens
      );

      this.nbreBiensAchete = this.biens.filter(
        (bien) => bien.bienCategorie == 'Vente' && bien.bienOqp == true
      ).length;
      this.nbreBiensAcheteP = this.pourcentageRetour(
        this.nbreBiensAchete,
        this.nbreBiens
      );

      this.nbreBiensDisponible = this.biens.filter(
        (bien) => bien.bienOqp == false || bien.bienOqp == null
      ).length;
      this.nbreBiensDisponibleP = this.pourcentageRetour(
        this.nbreBiensDisponible,
        this.nbreBiens
      );
    });
  }

  allLocataire() {
    this.locataireService.allLocataire().subscribe((ret) => {
      this.locataires = ret.data;
      this.nbreLocataires = ret.data.length;
    });
  }

  pourcentageCalcul(montant: number, taux: number) {
    return (montant * taux) / 100;
  }

  pourcentageRetour(nbre: number, total: number) {
    return (nbre * 100) / total;
  }

  allPaiement() {
    this.paiementService.allPaiement().subscribe((ret) => {
      this.paiements = ret.data;
      const gain = this.paiements
        .filter((paiement) => paiement.when_completed != null)
        .map((pai) =>
          this.pourcentageCalcul(pai.amount, pai.bailleur.bailleurTaux)
        )
        .reduce((sum, p) => sum + p);
      this.totalRevenu = Math.round(gain);
    });
  }
}
