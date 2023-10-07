import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormatDirective } from './input-format.directive';
import { ValidateAccountComponent } from './admin/validate-account/validate-account.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AuthService } from './services/auth.service';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

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
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
