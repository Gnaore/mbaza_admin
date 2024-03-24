import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  countries: any[] = [];
  selectedCountry: any;
  paymentTypes: any[] = [];
  selectedPaymentType: any;

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

    this.paymentTypes = [
      { name: 'Orange Money' },
      { name: 'Moov Money' },
      { name: 'MTN Money' },
      { name: 'Wave' }
    ];
  }
}
