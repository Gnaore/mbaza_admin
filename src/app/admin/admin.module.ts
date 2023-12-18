import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelComponent } from './panel/panel.component';
import { LessorPanelComponent } from './lessor-panel/lessor-panel.component';
import { LessorListComponent } from './lessor-list/lessor-list.component';
import { AddLessorComponent } from './add-lessor/add-lessor.component';
import { MoreInfosComponent } from './more-infos/more-infos.component';
import { AlertComponent } from './alert/alert.component';
import { TenantComponent } from './tenant/tenant.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChattelsComponent } from './chattels/chattels.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { InputFormatDirective } from '../input-format.directive';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CalendarModule } from 'primeng/calendar';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BankComponent } from './bank/bank.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { HelpMeBankComponent } from './help-me-bank/help-me-bank.component';
import { DialogModule } from 'primeng/dialog';
import { ToastrModule } from 'ngx-toastr';
import { TypebienComponent } from './typebien/typebien.component';
import { PaysComponent } from './pays/pays.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';

import { NgxLoadingModule } from 'ngx-loading';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [
    PanelComponent,
    LessorPanelComponent,
    LessorListComponent,
    AddLessorComponent,
    MoreInfosComponent,
    AlertComponent,
    TenantComponent,
    UserComponent,
    DashboardComponent,
    ChattelsComponent,
    InputFormatDirective,
    AdminDashboardComponent,
    BankComponent,
    PaymentFormComponent,
    HelpMeBankComponent,
    TypebienComponent,
    PaysComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FusionChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({}),
    ChipModule,
    DropdownModule,
    ConfirmPopupModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    TableModule,
    MultiSelectModule,
    TagModule,
    DialogModule,
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
})
export class AdminModule {}
