import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService){}

  private builder = inject(FormBuilder);

  formGroup!: FormGroup;
  isLoading: boolean = false;
  showPwd: boolean = false;
  reponse: any;
  afficheErreur: boolean = false;
  msgErreur="En attente de vos identifiants";

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  login(f: any){
    
    this.isLoading = true;
   /* const loginFormData = new FormData();
    loginFormData.append('userName', f.userName);
    loginFormData.append('password', f.password);*/
    var body = {
      "email":  f.email,
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
}
