import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ConfigService } from 'src/app/services/config.service';
import { PaysService } from 'src/app/services/pays.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss'],
})
export class PaysComponent {
  constructor(private paysService: PaysService) {}

  @ViewChild('closeModal') closeModal!: ElementRef;

  listpays: any[] = [];
  onepays: any;

  private builder = inject(FormBuilder);
  private configService = inject(ConfigService);

  formGroup!: FormGroup;
  isLoading: boolean = false;
  reponse: any;

  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = this.configService.PrimaryWhite;
  public secondaryColour = this.configService.SecondaryGrey;
  ngOnInit(): void {
    this.initForm();
    this.listPays();
  }

  initForm() {
    this.formGroup = this.builder.group({
      paysId: [''],
      libellePays: ['', [Validators.required]],
      codePays: ['', Validators.required],
    });
  }

  submitPays(f: any) {
    this.isLoading = true;
    var body = {
      paysId: f.paysId,
      libellePays: f.libellePays,
      codePays: f.codePays,
    };

    if (f.paysId) {
      this.paysService.modifiPays(body).subscribe(
        (result) => {
          this.reponse = result;
          this.isLoading = false;
          this.formGroup.reset();
          this.closeModal.nativeElement.click();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Enregistrement terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });
          this.listPays();
          console.log(this.reponse.data);
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
      this.paysService.ajoutPays(body).subscribe(
        (result) => {
          this.reponse = result;
          this.isLoading = false;
          this.formGroup.reset();
          this.closeModal.nativeElement.click();
          this.listPays();
          console.log(this.reponse.data);
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
  }

  listPays() {
    this.loading = true;
    this.listpays = [];
    this.paysService.AllPays().subscribe((ret) => {
      this.listpays = ret.data;
      this.loading = false;
    });
  }

  getOnePays(id: number) {
    this.loading = true;
    this.paysService.onePays(id).subscribe((result) => {
      this.onepays = result.data;
      this.formGroup.controls['libellePays'].setValue(this.onepays.libellePays);
      this.formGroup.controls['codePays'].setValue(this.onepays.codePays);
      this.formGroup.controls['paysId'].setValue(this.onepays.paysId);
      this.loading = false;
    });
  }

  supPays(id: any){
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
        this.loading = true;
        this.paysService.supPays(id).subscribe(
          (ret) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Suppression terminée avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
            this.listPays();
            this.loading = false;
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.statusText,
            });
            this.loading = false;
          }
        );
      }
    });
  }
}
