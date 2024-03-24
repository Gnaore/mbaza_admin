import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-help-me-bank',
  templateUrl: './help-me-bank.component.html',
  styleUrls: ['./help-me-bank.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class HelpMeBankComponent {
  rangeDates: Date[] | undefined;
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
