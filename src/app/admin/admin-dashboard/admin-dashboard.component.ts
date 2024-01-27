import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  doughnutSource!: Object;
  barSource!: Object;
  pieSource!: Object;
  lineSource!: Object;

  countries: any[] = [];
  selectedCountry: any;

  constructor(
    private router: Router
  ) {

    // Configuration Bar Chart
    const barData = [
      {
        label: "Côte d'Ivoire",
        value: "290"
      },
      {
        label: "Cameroun",
        value: "260"
      },
      {
        label: "Togo",
        value: "180"
      },
      {
        label: "Bénin",
        value: "140"
      },
      {
        label: "Mali",
        value: "100"
      },
      {
        label: "Burkina Faso",
        value: "120"
      }
    ];
    const barSource = {
      chart: {
        //Set the chart caption
        caption: "Bilan Financier Par Pays",
        //Set the chart subcaption
        subCaption: "Montant total perçu par pays",
        //Set the x-axis name
        xAxisName: "Pays",
        //Set the y-axis name
        yAxisName: "Montant Total",
        numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data - from step 2
      data: barData
    };

    // Configuration Doughnut Chart
    const doughnutData = [
      {
        label: "Orange Money",
        value: "290"
      },
      {
        label: "Moov Money",
        value: "260"
      },
      {
        label: "MTN Money",
        value: "180"
      },
      {
        label: "Wave Money",
        value: "140"
      }
    ];
    const doughnutSource = {
      chart: {
        //Set the chart caption
        caption: "Statistiques Par Mobile Money",
        //Set the chart subcaption
        subCaption: "Effectif des transactions par réseau mobile",
        //Set the x-axis name
        xAxisName: "Mobile Money",
        //Set the y-axis name
        yAxisName: "Nombre de transactions",
        // numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data - from step 2
      data: doughnutData
    };

    // Configuration Pie Chart
    const pieData = [
      {
        label: "BHCI",
        value: "290"
      },
      {
        label: "BNI",
        value: "260"
      },
      {
        label: "SGCI",
        value: "180"
      },
      {
        label: "Cred Africa",
        value: "140"
      },
      {
        label: "Tresor Bank",
        value: "60"
      }
    ];
    const pieSource = {
      chart: {
        //Set the chart caption
        caption: "Statistiques Par Banque",
        //Set the chart subcaption
        subCaption: "Effectif des locataires par banque",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data - from step 2
      data: pieData
    };

    // Configuration Line Chart
    const lineData = [
      {
        label: "Janvier",
        value: "50"
      },
      {
        label: "Février",
        value: "260"
      },
      {
        label: "Mars",
        value: "180"
      },
      {
        label: "Avril",
        value: "200"
      },
      {
        label: "Mai",
        value: "60"
      },
      {
        label: "Juin",
        value: "70"
      }
    ];

    const lineSource = {
      chart: {
        //Set the chart caption
        caption: "Statistiques Des Pénalités",
        //Set the chart subcaption
        subCaption: "Montant total des pénalités par mois",
        //Set the theme for your chart
        theme: "fusion",
        numberSuffix: "K"
      },
      // Chart Data - from step 2
      data: lineData
    };

    this.doughnutSource = doughnutSource;
    this.barSource = barSource;
    this.pieSource = pieSource;
    this.lineSource = lineSource;
  }
  ngOnInit(): void {
    this.countries = [
      { name: 'Côte d\'Ivoire', code: 'CI' },
      { name: 'Burkina Faso', code: 'BF' },
      { name: 'Mali', code: 'ML' },
      { name: 'Congo Brazzaville', code: 'CG' },
      { name: 'Congo RDC', code: 'CD' },
      { name: 'Senegal', code: 'SN' },
      { name: 'Togo', code: 'TG' },
      { name: 'Benin', code: 'BJ' },
      { name: 'Gabon', code: 'GA' },
      { name: 'Cameroun', code: 'CM' },
      { name: 'Guinée Conakry', code: 'GN' }
    ];
  }

  goTo(path: string) {
    this.router.navigate(['/admin/' + path]);
  }
}
