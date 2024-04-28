import { TpyebienService } from 'src/app/services/tpyebien.service';
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { UploadService } from 'src/app/services/upload.service';
import { BienService } from 'src/app/services/bien.service';
import Swal from 'sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chattels',
  templateUrl: './chattels.component.html',
  styleUrls: ['./chattels.component.scss'],
})
export class ChattelsComponent implements OnInit {
  constructor(
    private tpyebienService: TpyebienService,
    private configService: ConfigService,
    private uploadService: UploadService,
    private bienService: BienService,
    private router: Router
  ) {}

  @ViewChild('closeModal') closeModal!: ElementRef;

  listTypeBien: any;
  listeBien: any;
  oneBien: any;

  builder = inject(FormBuilder);
  bienFormGroup!: FormGroup;

  fileToUploadPropriete: any;
  previewImagePropriete: any;
  lienPhotoretourPropriete: any;
  file: any;

  libelleContrat: String = '';

  public loading = false;
  public isLoading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = this.configService.PrimaryWhite;
  public secondaryColour = this.configService.SecondaryGrey;

  ngOnInit() {
    this.init_bienFormGroup();
    this.listeTypeBien();
    this.listBien();
  }

  init_bienFormGroup() {
    this.bienFormGroup = this.builder.group({
      bienId: [''],
      bienLibelle: ['', Validators.required],
      typebienId: ['', Validators.required],
      bienCategorie: ['', Validators.required],
      bienDescription: ['', Validators.required],
      bienSurface: [],
      bienNbrePiece: [],
      bienPrix: [Validators.required],
      bienVille: ['', Validators.required],
      bienCommuneQuartier: ['', Validators.required],
      bienAdresse: ['', Validators.required],
      bienNomBailleur: ['', Validators.required],
      bienContactBailleur: ['', Validators.required],
      bienContrat: ['', Validators.required],
      bienImage: ['', Validators.required],
      bienOqp: [false],
    });
  }

  listeTypeBien() {
    this.loading = true;
    this.tpyebienService.AllTypebien().subscribe(
      (ret) => {
        this.listTypeBien = ret.data;
        this.loading = false;
      },
      (err) => {
        if (err.error.statusCode == 401) {
          this.router.navigateByUrl('/auth');
        }
      }
    );
  }

  listBien() {
    this.loading = true;
    this.bienService.AllBien().subscribe(
      (ret) => {
        this.listeBien = ret.data;
        this.loading = false;
      },
      (err) => {
        if (err.error.statusCode == 401) {
          this.router.navigateByUrl('/auth');
        }
        this.loading = false;
      }
    );
  }

  submitBien(f: any) {
    var body = {
      bienId: f.bienId,
      bienLibelle: f.bienLibelle,
      typebienId: parseInt(f.typebienId),
      bienCategorie: f.bienCategorie,
      bienDescription: f.bienDescription,
      bienSurface: f.bienSurface,
      bienNbrePiece: f.bienNbrePiece,
      bienPrix: f.bienPrix,
      bienVille: f.bienVille,
      bienCommuneQuartier: f.bienCommuneQuartier,
      bienAdresse: f.bienAdresse,
      bienNomBailleur: f.bienNomBailleur,
      bienContactBailleur: f.bienContactBailleur,
      bienContrat: f.bienContrat,
      bienImage: f.bienImage,
      bienOqp: f.bienOqp,
    };
    if (f.bienId) {
      //Mise a jour
      this.isLoading = true;
      this.bienService.modifiBien(body).subscribe(
        (ret) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Modification terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
          this.closeModal.nativeElement.click();
          this.listBien();
          this.bienFormGroup.reset();
        },
        (err) => {
          if (err.error.statusCode == 401) {
            this.router.navigateByUrl('/auth');
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.statusText,
          });
          this.isLoading = false;
        }
      );
    } else {
      //Nouveau
      this.isLoading = true;
      this.bienService.ajoutBien(body).subscribe(
        (ret) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Enregistrement terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
          this.closeModal.nativeElement.click();
          this.listBien();
          this.bienFormGroup.reset();
        },
        (err) => {
          if (err.error.statusCode == 401) {
            this.router.navigateByUrl('/auth');
          }
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

  onFileChangeBien(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileToUploadPropriete = file;
      const formData = new FormData();
      formData.append('file', this.fileToUploadPropriete);
      this.uploadService.upload(formData).subscribe(
        (ret) => {
          console.log(ret);
          this.lienPhotoretourPropriete = this.configService.urlgimg + ret.data;
          this.file = ret.data;
          this.bienFormGroup.controls['bienImage'].setValue(ret.data);
        },
        (err) => {
          console.log(err);
          this.previewImagePropriete = '';
        }
      );
    }
  }

  onFileChangeContrat(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileToUploadPropriete = file;
      const formData = new FormData();
      formData.append('file', this.fileToUploadPropriete);
      this.uploadService.upload(formData).subscribe(
        (ret) => {
          console.log(ret);
          //this.libelleContrat = this.configService.urlg + ret.data;
          this.libelleContrat = ret.data;
          this.bienFormGroup.controls['bienContrat'].setValue(ret.data);
        },
        (err) => {
          console.log(err);
          this.libelleContrat = '';
        }
      );
    }
  }

  resetForm() {
    this.bienFormGroup.reset();
    this.libelleContrat = '';
    this.bienFormGroup.controls['bienContrat'].reset();
    this.lienPhotoretourPropriete = '';
    this.file = '';
    this.bienFormGroup.controls['bienImage'].reset();
  }

  supContrat(libelleContrat: any) {
    alert(libelleContrat);
  }

  getOneBien(id: any) {
    this.isLoading = true;
    this.bienService.oneBien(id).subscribe(
      (rep) => {
        this.oneBien = rep.data;
        this.bienFormGroup.controls['bienId'].setValue(this.oneBien.bienId);
        this.bienFormGroup.controls['bienLibelle'].setValue(
          this.oneBien.bienLibelle
        );
        this.bienFormGroup.controls['typebienId'].setValue(
          this.oneBien.typebien.typebienId
        );
        this.bienFormGroup.controls['bienCategorie'].setValue(
          this.oneBien.bienCategorie
        );
        this.bienFormGroup.controls['bienDescription'].setValue(
          this.oneBien.bienDescription
        );
        this.bienFormGroup.controls['bienSurface'].setValue(
          this.oneBien.bienSurface
        );
        this.bienFormGroup.controls['bienNbrePiece'].setValue(
          this.oneBien.bienNbrePiece
        );
        this.bienFormGroup.controls['bienPrix'].setValue(this.oneBien.bienPrix);
        this.bienFormGroup.controls['bienVille'].setValue(
          this.oneBien.bienVille
        );
        this.bienFormGroup.controls['bienCommuneQuartier'].setValue(
          this.oneBien.bienCommuneQuartier
        );
        this.bienFormGroup.controls['bienAdresse'].setValue(
          this.oneBien.bienAdresse
        );
        this.bienFormGroup.controls['bienNomBailleur'].setValue(
          this.oneBien.bienNomBailleur
        );
        this.bienFormGroup.controls['bienContactBailleur'].setValue(
          this.oneBien.bienContactBailleur
        );
        this.bienFormGroup.controls['bienContrat'].setValue(
          this.oneBien.bienContrat
        );
        this.bienFormGroup.controls['bienOqp'].setValue(this.oneBien.bienOqp);
        this.lienPhotoretourPropriete =
          this.configService.urlgimg + this.oneBien.bienImage;
        this.libelleContrat = this.oneBien.bienContrat;
        this.bienFormGroup.controls['bienImage'].setValue(
          this.oneBien.bienImage
        );
        this.isLoading = false;
      },
      (err) => {
        if (err.error.statusCode == 401) {
          this.router.navigateByUrl('/auth');
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.statusText,
        });
        this.isLoading = false;
      }
    );
  }

  openDoc(libelleContrat: any) {
    window.open(this.configService.urlg + libelleContrat, '_blank');
  }
  openDoc2(lienImage: any) {
    window.open(lienImage, '_blank');
  }

  suprimeBien(bienId: any, status: boolean) {
    if (status == true) {
      Swal.fire(
        'Impossible de supprimer',
        'Le Bien ne peut être supprimé, car il est marqué comme non disponible'
      );
      return;
    }
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
        this.bienService.supBien(bienId).subscribe(
          (ret) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Suppression terminée avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
            this.listBien();
            this.loading = false;
          },
          (err) => {
            if (err.error.statusCode == 401) {
              this.router.navigateByUrl('/auth');
            }
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
