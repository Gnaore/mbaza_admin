import { Component } from '@angular/core';

@Component({
  selector: 'app-add-lessor',
  templateUrl: './add-lessor.component.html',
  styleUrls: ['./add-lessor.component.scss']
})
export class AddLessorComponent {
  eqpmtSup: boolean = false;
  banks: any[] = [];
  typesProprietes: any[] = [];
  selectedTypePropriete: any;
  selectedBank: any;

  ngOnInit(): void {
    this.banks = [
      { name: 'Cred Africa' },
      { name: 'Cofina' },
      { name: 'BNI' },
      { name: 'BHCI' },
      { name: 'SGCI' }
    ];

    this.typesProprietes = [
      { name: 'Maison basse' },
      { name: 'Appartement' },
      { name: 'Immeuble' },
      { name: 'Pièce' }
    ];
  }
}
