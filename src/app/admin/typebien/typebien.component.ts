import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TpyebienService } from 'src/app/services/tpyebien.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-typebien',
  templateUrl: './typebien.component.html',
  styleUrls: ['./typebien.component.scss']
})
export class TypebienComponent implements OnInit {
  constructor(
    private typebienService: TpyebienService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  countries: any[] = [];
  selectedCountry: any;
  paymentTypes: any[] = [];
  selectedPaymentType: any;

  typebiens: any[] = [];
  Onetypebien: any = [];

  //private builder = inject(FormBuilder);

  formGroup!: FormGroup;

  initForm() {
    this.formGroup = this.formBuilder.group({
      typebienId: [''],
      libelleTypebien: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.allTypebien();
  }

  ajouteTypebien(f: any) {
    var body = {
      typebienId: f.typebienId,
      libelleTypebien: f.libelleTypebien,
    };
    if (f.typebienId) {
      this.typebienService.modifiTypebien(body).subscribe(
        (ret) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Enregistrement terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });
          this.formGroup.reset();
          this.allTypebien();
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
      this.typebienService.ajoutTypebien(body).subscribe(
        (ret) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Enregistrement terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });
          this.formGroup.reset();
          this.allTypebien();
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

  allTypebien() {
    this.typebienService.AllTypebien().subscribe(
      (ret) => {
        this.typebiens = ret.data;
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

  oneTypebien(id: number) {
    // console.log(id);
    this.typebienService.oneTypebien(id).subscribe(
      (ret) => {
        this.Onetypebien = ret.data;
        this.formGroup.controls['typebienId'].setValue(
          this.Onetypebien.typebienId
        );
        this.formGroup.controls['libelleTypebien'].setValue(
          this.Onetypebien.libelleTypebien
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

  supTypebien(id: number) {
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
        this.typebienService.supTypebien(id).subscribe(
          (ret) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Suppression terminée avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
            this.allTypebien();
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
}
