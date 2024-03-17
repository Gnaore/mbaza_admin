import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  urlG: string = ''; 
  urlGsms: string = '';

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
    this.urlG = configService.urlg;
    this.urlGsms = configService.urlGsms;
  }

  sms(data: any): Observable<any> {
    return this.httpClient.post(this.urlGsms, data);
  }
  
}