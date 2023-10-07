import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  formGroup!: FormGroup;
  isLoading: boolean = false;
  reponse: any;

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
    this.listpays = [];
    this.paysService.AllPays().subscribe((ret) => {
      this.listpays = ret.data;
      console.log(this.listpays);
    });
  }

  getOnePays(id: number) {
    this.paysService.onePays(id).subscribe((result) => {
      this.onepays = result.data;
      this.formGroup.controls['libellePays'].setValue(this.onepays.libellePays);
      this.formGroup.controls['codePays'].setValue(this.onepays.codePays);
      this.formGroup.controls['paysId'].setValue(this.onepays.paysId);
      console.log(this.onepays);
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
