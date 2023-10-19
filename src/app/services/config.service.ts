import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  //**en dev mac
   urlg = 'http://10.10.2.160:3000/'

  //*sur server distant
  //urlg = 'https://apimbaza.empreinte-ci.net/';
  // urlg = 'https://apiparcauto.afinov.com';
  //urlg = 'http://10.102.0.25:3000/'; //API RTI
  // urlTrombino = 'http://172.16.2.16:8060';
  // urlgestock = 'http://172.16.2.16:8020';

  idUser = localStorage.getItem('id');
  var_Reattribution: any;
  MesTickets: boolean = false;
  MesAttributions: boolean = false;
  GestionTickets: boolean = false;
  Referentiel: boolean = false;
  Administration: boolean = false;

  constructor() { }
}
