import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BanqueService } from 'src/app/services/banque.service';
import { PaysService } from 'src/app/services/pays.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent implements OnInit {
  constructor(
    private banqueService: BanqueService,
    private paysService: PaysService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  countries: any[] = [];
  selectedCountry: any;
  paymentTypes: any[] = [];
  selectedPaymentType: any;

  banques: any[] = [];
  Onebanque: any = [];

  //private builder = inject(FormBuilder);

  formGroup!: FormGroup;

  initForm() {
    this.formGroup = this.formBuilder.group({
      banqueId: [''],
      banqueCode: [''],
      libelleBanque: ['', Validators.required],
      sigleBanque: ['', [Validators.required]],
      paysId: ['', Validators.required],
      contactBanque: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.allBanque();
    this.allPays();
  }

  ajouteBanque(f: any) {

    var body = {
      banqueId: f.banqueId,
      libelleBanque: f.libelleBanque,
      sigleBanque: f.sigleBanque,
      paysId: this.selectedCountry.paysId,
      contactBanque: f.contactBanque,
    };
    if (f.banqueId) {
      this.banqueService.modifiBanque(body).subscribe(
        (ret) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Enregistrement terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });
          this.formGroup.reset();
          this.allBanque();
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.statusText,
          });
        }
      );
    } else {
      this.banqueService.ajoutBanque(body).subscribe(
        (ret) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Enregistrement terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });
          this.formGroup.reset();
          this.allBanque();
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.statusText,
          });
        }
      );
    }
  }

  annuler() {
    this.formGroup.reset();
  }

  allPays() {
    this.paysService.AllPays().subscribe((ret) => {
      this.countries = ret.data;
    });
  }

  allBanque() {
    this.banqueService.AllBanque().subscribe(
      (ret) => {
        this.banques = ret.data;
      },
      (err) => {
        if (err.status == 401) {
          this.router.navigateByUrl('/login');
        } else {
          console.log(err.status);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.status,
          });
        }
      }
    );
  }

  oneBanque(id: number) {
    // console.log(id);
    this.banqueService.oneBanque(id).subscribe(
      (ret) => {
        this.Onebanque = ret.data[0];
        this.formGroup.controls['banqueCode'].setValue(
          this.Onebanque.banqueCode
        );
        this.formGroup.controls['sigleBanque'].setValue(
          this.Onebanque.sigleBanque
        );
        this.formGroup.controls['banqueId'].setValue(this.Onebanque.banqueId);
        this.formGroup.controls['libelleBanque'].setValue(
          this.Onebanque.libelleBanque
        );

        this.selectedCountry = ret.data[0].pays
        

        this.formGroup.controls['contactBanque'].setValue(
          this.Onebanque.contactBanque
        );


      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.statusText,
        });
      }
    );
  }

  supBanque(id: number) {
    Swal.fire({
      title: 'Etes-vous vraiment certain ?',
      text: 'Cet enregistrement sera supprimé !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.banqueService.supBanque(id).subscribe(
          (ret) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Suppression terminée avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
            this.allBanque();
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.statusText,
            });
          }
        );
      }
    });
  }

  reset() {
    this.formGroup.reset();
  }
}
