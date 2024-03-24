import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  rangeDates: Date[] | undefined;
  visible: boolean = false;
  bailleur: any[] = [];
  selectedBailleur: any;
  
  ngOnInit(): void {
    this.bailleur = [
      { name: '08989BA01' },
      { name: '13567BA11' },
      { name: '1909BA14' },
      { name: '789BA13' }
    ];
  }
}
