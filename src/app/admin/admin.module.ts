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
import { FusionChartsModule } from "angular-fusioncharts";
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { InputFormatDirective } from '../input-format.directive';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BankComponent } from './bank/bank.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { HelpMeBankComponent } from './help-me-bank/help-me-bank.component';
import { DialogModule } from 'primeng/dialog';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationPayeeComponent } from './reservation-payee/reservation-payee.component';

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
    ReservationComponent,
    ReservationPayeeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FusionChartsModule,
    FormsModule,
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
    DialogModule
  ]
})
export class AdminModule { }
