import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

  private builder = inject(FormBuilder);
  private router = inject(Router);
  private resetPasswordService = inject(ResetPasswordService);

  formGroup!: FormGroup;
  email!: FormGroup;
  visible: boolean = false;
  isLoading: boolean = false;
  showPwd: boolean = false;
  reponse: any;
  error: { success: boolean, errorMessage: string } = { success: false, errorMessage: "" };
  afficheErreur: boolean = false;
  msgErreur = "En attente de vos identifiants";

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });

    this.email = this.builder.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  login(f: any) {

    this.isLoading = true;
    /* const loginFormData = new FormData();
     loginFormData.append('userName', f.userName);
     loginFormData.append('password', f.password);*/
    var body = {
      "email": f.email,
      "password": f.password
    };
    //console.log(body);
    this.authService.login(body).subscribe(result => {
      this.reponse = result;
      //this.router.navigate(['/tableaudebord']);
      window.location.href = '/admin';
    }, (err) => {
      localStorage.clear();
      this.msgErreur = err.error.message
      console.log(err);
      this.afficheErreur = true;
      this.isLoading = false;
    });

  }

  verifEmail() {
    this.error.success = false;
    this.error.errorMessage = "";
    this.resetPasswordService.verificationEmail({ email: this.email.get('email')?.value }).subscribe({
      next: (res) => {
        if (res.data.success) {
          this.router.navigate(['auth/reset-password'], { state: { email: this.email.get('email')?.value }});
        } else {
          this.error.success = true;
          this.error.errorMessage = res.data.msg
        }
      }
    })
  }
}
