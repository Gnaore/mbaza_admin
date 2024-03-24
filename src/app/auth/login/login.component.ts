import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private builder = inject(FormBuilder);

  formGroup!: FormGroup;
  isLoading: boolean = false;
  showPwd: boolean = false;
  visible: boolean = false;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    
  }
}
