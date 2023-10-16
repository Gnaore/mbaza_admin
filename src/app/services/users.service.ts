import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
 
  urlG: string = '';

  httpOptions = {
    headers: new HttpHeaders({
      accept: 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      // 'Authorization':  'Bearer {{access_token}}'
    }),
  };

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = configService.urlg;
  }

  getAllUsers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',

        // 'Authorization':  'Bearer {{access_token}}'
      }),
    };
    return this.httpClient.get<any>(this.urlG + 'user/allusers', httpOptions);
  }

  saveUser(data: any): Observable<any> {
    return this.httpClient.post(
      this.urlG + 'user/signup',
      data,
      this.httpOptions
    );
  }


  getOneUser(id: any): Observable<any>{
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.get(this.urlG + 'user/oneuser/'+ id, { headers });
  }


  modifiUser(data: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.post(
      this.urlG + 'user/modif',
      data, { headers }
    );
  }

  modifiStatutUser(data: any): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentUserJSON.token}`,
    });
    return this.httpClient.post(
      this.urlG + 'user/modifstatut',
      data, { headers }
    );
  }

  /* 
  deleteDirection(id) {
    return this.httpClient.delete( this.urlG + '/api/Core/Directions/' + id);
  }

  updateDirection(id, data){
    return this.httpClient.put(this.urlG + '/api/Core/Directions/' + id , data);
  }
*/
}
