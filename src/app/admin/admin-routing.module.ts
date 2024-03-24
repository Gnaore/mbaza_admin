import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BankComponent } from './bank/bank.component';
import { ValidateAccountComponent } from './validate-account/validate-account.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { HelpMeBankComponent } from './help-me-bank/help-me-bank.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationPayeeComponent } from './reservation-payee/reservation-payee.component';

const routes: Routes = [
  { 
    path: '', component: PanelComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { 
        path: 'lessor-manager', component: LessorPanelComponent, children: [
          { path: '', component: LessorListComponent },
          { path: 'add-lessor', component: AddLessorComponent },
          { path: 'more-info/:id', component: MoreInfosComponent },
        ]
      },
      { path: 'reservation', component: ReservationComponent },
      { path: 'reservation-validee', component: ReservationPayeeComponent },
      { path: 'chattels', component: ChattelsComponent },
      { path: 'alerts/:id', component: AlertComponent },
      { path: 'validate-account', component: ValidateAccountComponent },
      { path: 'payment-form', component: PaymentFormComponent },
      { path: 'help-me-bank', component: HelpMeBankComponent },
      { path: 'tenant/:id', component: TenantComponent },
      { path: 'users', component: UserComponent },
      { path: 'banks', component: BankComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
