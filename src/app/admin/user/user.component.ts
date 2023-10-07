import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from 'src/app/services/users.service';
import { UploadService } from 'src/app/services/upload.service';
import { ConfigService } from 'src/app/services/config.service';
import { PaysService } from 'src/app/services/pays.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
 
  constructor(
    private usersService: UsersService,
    private uploadService: UploadService,
    private configService: ConfigService,
    private paysService: PaysService
  ) {}

  @ViewChild('closeModal') closeModal!: ElementRef;

  previewImage: any;

  countries: any[] = [];
  selectedCountry: any;
  listUers: any[] = [];
  fileToUpload: any;
  lienPhotoretour: any;
  file: any;
  urlg: any;

  private builder = inject(FormBuilder);

  formGroup!: FormGroup;
  isLoading: boolean = false;
  showPwd: boolean = false;
  reponse: any;
  afficheErreur: boolean = false;
  msgErreur = 'En attente de vos identifiants';

  ngOnInit(): void {
    this.listePays();
    this.lienPhotoretour = '';
    this.initForm();
    this.listeUtilisateurs();
    this.urlg = this.configService.urlg;

    /* this.countries = [
      { name: "Côte d'Ivoire", code: 'CI' },
      { name: 'Burkina Faso', code: 'BF' },
      { name: 'Mali', code: 'ML' },
      { name: 'Congo Brazzaville', code: 'CG' },
      { name: 'Congo RDC', code: 'CD' },
      { name: 'Senegal', code: 'SN' },
      { name: 'Togo', code: 'TG' },
      { name: 'Benin', code: 'BJ' },
      { name: 'Gabon', code: 'GA' },
      { name: 'Cameroun', code: 'CM' },
      { name: 'Guinée Conakry', code: 'GN' },
    ];*/
  }

  initForm() {
    this.formGroup = this.builder.group({
      userId: [''],
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      contact: ['', Validators.required],
      paysId: ['', Validators.required],
      role: ['', Validators.required],
      file: [''],
    });
  }

  ajoutUtilisateur(f: any) {
    this.isLoading = true;

    var body = {
      contact: f.contact,
      email: f.email,
      paysId: this.selectedCountry.paysId,
      role: f.role,
      username: f.username,
      lienphoto: this.file,
      userId: f.userId,
    };

    if (f.userId) {
      //console.log(body);
      this.usersService.modifiUser(body).subscribe(
        (result) => {
          this.reponse = result;
          this.isLoading = false;
          this.formGroup.reset();
          this.closeModal.nativeElement.click();
          // this.toastr.success("L'utilisateur créé avec succés");
          this.listeUtilisateurs();
          console.log(this.reponse.data);
          this.formGroup.reset();
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      //console.log(body);
      this.usersService.saveUser(body).subscribe(
        (result) => {
          this.reponse = result;
          this.isLoading = false;
          this.formGroup.reset();
          this.closeModal.nativeElement.click();
          // this.toastr.success("L'utilisateur créé avec succés");
          this.listeUtilisateurs();
          console.log(this.reponse.data);
          this.formGroup.reset();
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
  }

  listePays() {
    this.paysService.AllPays().subscribe(
      (ret) => {
        this.countries = ret.data;
      },
      (err) => {}
    );
  }

  listeUtilisateurs() {
    this.listUers = [];
    this.usersService.getAllUsers().subscribe((ret) => {
      this.listUers = ret.data;
      console.log(this.listUers);
    });
  }

  getOneUtilisateur(id: any) {
    this.usersService.getOneUser(id).subscribe(
      (ret) => {
        console.log(ret);
        this.formGroup.controls['userId'].setValue(ret.data.userId);
        this.formGroup.controls['username'].setValue(ret.data.username);
        this.formGroup.controls['contact'].setValue(ret.data.contact);
        this.formGroup.controls['email'].setValue(ret.data.email);
        // this.formGroup.controls['paysId'].setValue(ret.data.paysId);
        // this.selectedCountry = ret.data.paysId;
        this.formGroup.controls['role'].setValue(ret.data.role);
        this.lienPhotoretour = this.configService.urlg + ret.data.lienphoto;
        this.file = ret.data.lienphoto;
        this.paysService.onePays(ret.data.paysId).subscribe((ret) => {
          this.selectedCountry = ret.data;
          //console.log(ret.data);
        });
      },
      (err) => {
        console.log(err.message);
        this.formGroup.reset();
      }
    );
  }

  //////////////////////////////////

  onFileChange(event: any) {
    this.lienPhotoretour = '';
    this.file = '';
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.previewImage = file.name;
      this.fileToUpload = file;
      const formData = new FormData();
      formData.append('file', this.fileToUpload);
      this.uploadService.upload(formData).subscribe(
        (ret) => {
          console.log(ret);
          this.lienPhotoretour = this.configService.urlg + ret.data;
          this.file = ret.data;
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.previewImage = '';
          this.isLoading = false;
        }
      );
    }
  }

  checkChange(status: any, userId: any) {
    console.log(status, userId);
    var boby = {
      statut: status,
      userId: userId,
    };
    this.usersService.modifiStatutUser(boby).subscribe(
      (ret) => {
        console.log(ret);
        this.listeUtilisateurs();
      },
      (err) => {
        console.log(err.message);
      }
    );
  }


  reset() {
    this.formGroup.reset();
  }
}
