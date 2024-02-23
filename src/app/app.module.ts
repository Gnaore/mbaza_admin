import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidateAccountComponent } from './admin/validate-account/validate-account.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AuthService } from './services/auth.service';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    ValidateAccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ConfirmPopupModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    }),
  ],
  providers: [AuthService, {provide: LOCALE_ID, useValue: "fr" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
