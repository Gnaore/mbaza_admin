import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ValidateAccountComponent {
  addAccountNumber: boolean[] = [false].constructor(4);
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'En êtes-vous sûr ?',
      icon: 'ti ti-help',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
