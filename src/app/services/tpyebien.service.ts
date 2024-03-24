import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TpyebienService {
  urlG: string = '';

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = configService.urlg;
  }

  ajoutTypebien(data: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.post(this.urlG + 'typebien/create', data, { headers });
  }

  modifiTypebien(data: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.put(this.urlG + 'typebien/modif', data, { headers });
  }

  supTypebien(id: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.delete(this.urlG + 'typebien/sup/' + id, { headers });
  }

  AllTypebien(): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + 'typebien/all', { headers });
  }

  oneTypebien(id: number): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + 'typebien/' + id, { headers });
  }
}