import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  countries: any[] = [];
  users: any[] = [];
  userNames: String[] = [];
  emails: String[] = [];
  selectedCountry: any;
  previewImage: any;

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

    this.users = [
      { image: 'assets/images/profile/user-1.jpg', email: 'kouame@gmail.com', name: 'KOUAME Landry', tel: '+225 0929829283', role: 'ADMIN', statut: 0 },
      { image: 'assets/images/profile/user-1.jpg', email: 'erickmbaa@gmail.com', name: 'MBAA Erick', tel: '+225 0929829283', role: 'ROOT', statut: 1 },
      { image: 'assets/images/profile/user-1.jpg', email: 'hervegnaore@gmail.com', name: 'GNAORE Hervé', tel: '+225 0929829283', role: 'ADMIN', statut: 0 },
      { image: 'assets/images/profile/user-1.jpg', email: 'kradaniel@gmail.com', name: 'KRA Daniel', tel: '+225 0929829283', role: 'BANQUE', statut: 0 },
      { image: 'assets/images/profile/user-1.jpg', email: 'cadiofabrice@gmail.com', name: 'CADIO Fabrice', tel: '+225 0929829283', role: 'HUISSIER', statut: 0 }
    ];

    this.users.forEach(user => {
      this.userNames.push(user.name);
      this.emails.push(user.email);
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.previewImage = file.name
      // var reader = new FileReader();
      // // reader.onload = (e) => this.previewImage = e.target?.result;
      // // reader.readAsDataURL(file);
    }
  }
}
