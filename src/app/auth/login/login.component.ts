import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ConfigService } from 'src/app/services/config.service';
import { ROLE } from 'src/app/enum/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    
    constructor(private authService: AuthService, private configService: ConfigService) { }

  private builder = inject(FormBuilder);
  private router = inject(Router);
  private resetPasswordService = inject(ResetPasswordService);
  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  primaryColour = this.configService.PrimaryWhite;
  secondaryColour = this.configService.SecondaryGrey;


  formGroup!: FormGroup;
  email!: FormGroup;
  visible: boolean = false;
  isLoading: boolean = false;
  showPwd: boolean = false;
  reponse: any;
  error: { success: boolean, errorMessage: string } = { success: false, errorMessage: "" };
  afficheErreur: boolean = false;
  noAccess: boolean = false;
  msgErreur = "En attente de vos identifiants";

  role = ROLE;

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
    this.afficheErreur = false;
    this.noAccess = false;
    this.isLoading = true;
    /* const loginFormData = new FormData();
     loginFormData.append('userName', f.userName);
     loginFormData.append('password', f.password);*/
    var body = {
      "email": f.email,
      "password": f.password
    };
  

   
    this.authService.login(body).subscribe(result => {
      this.reponse = result;
      console.log(this.reponse);
      if(this.reponse.data.succes == true){
        if (result.data.data.user.userrole === this.role.ADMIN || result.data.data.user.userrole === this.role.ROOT)
          window.location.href = '/admin/dashboard';  
        else {
          localStorage.clear();
          this.isLoading = false;
          this.noAccess = true;
        }
      } else {
   
        this.afficheErreur = true;
        this.isLoading = false;
        this.msgErreur = this.reponse.data.data.message
        localStorage.clear();
        
      }
      
      
      //this.router.navigate(['/tableaudebord']);
    }, (err) => {
      localStorage.clear();
      this.msgErreur = err.error
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
