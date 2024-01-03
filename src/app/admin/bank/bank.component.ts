import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { BanqueService } from 'src/app/services/banque.service';
import { ConfigService } from 'src/app/services/config.service';
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
    private configService: ConfigService,
    private router: Router
  ) { }

  countries: any[] = [];
  selectedCountry: any;
  paymentTypes: any[] = [];
  selectedPaymentType: any;

  banques: any[] = [];
  Onebanque: any = [];
  isLoading: boolean = false;

  //private builder = inject(FormBuilder);

  formGroup!: FormGroup;

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = this.configService.PrimaryWhite;
  public secondaryColour = this.configService.SecondaryGrey;

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
    this.isLoading = true
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
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.statusText,
          });
          this.isLoading = false;
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
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.statusText,
          });
          this.isLoading = false;
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
    this.isLoading = true;
    this.banqueService.AllBanque().subscribe(
      (ret) => {
        this.banques = ret.data;
        this.isLoading = false;
      },
      (err) => {
        if (err.status == 401) {
          this.router.navigateByUrl('/login');
          this.isLoading = false;
        } else {
          console.log(err.status);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.status,
          });
          this.isLoading = false;
        }
      }
    );
  }

  // récupération des informations de la banque
  oneBanque(banque: any) {
    this.formGroup.patchValue({
      banqueCode: banque.banqueCode,
      sigleBanque: banque.sigleBanque,
      banqueId: banque.banqueId,
      libelleBanque: banque.libelleBanque,
      contactBanque: banque.contactBanque,
      paysId: banque.pays.paysId,
    });

    this.selectedCountry = this.countries.find(country => country.paysId == banque.pays.paysId)
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
        this.isLoading = true;
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
            this.isLoading = false;
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.statusText,
            });
            this.isLoading = false;
          }
        );
      }
    });
  }

  reset() {
    this.formGroup.reset();
  }
}
