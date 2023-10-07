import { TpyebienService } from 'src/app/services/tpyebien.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { UploadService } from 'src/app/services/upload.service';
import { BienService } from 'src/app/services/bien.service';
import Swal from 'sweetalert2';

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
    private bienService: BienService
  ) {}

  @ViewChild('closeModal') closeModal!: ElementRef;

  listTypeBien: any;
  listeBien: any;

  builder = inject(FormBuilder);
  bienFormGroup!: FormGroup;

  fileToUploadPropriete: any;
  previewImagePropriete: any;
  lienPhotoretourPropriete: any;
  file: any;

  libelleContrat: String = '';

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
    });
  }

  listeTypeBien() {
    this.tpyebienService.AllTypebien().subscribe((ret) => {
      this.listTypeBien = ret.data;
    });
  }

  listBien() {
    this.bienService.AllBien().subscribe((ret) => {
      this.listeBien = ret.data;
    });
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
    };
    console.log(body);
    if (f.bienId) {
      //Mise a jour
    } else {
      //Nouveau
      this.bienService.ajoutBien(body).subscribe(
        (ret) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Enregistrement terminé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });
          this.closeModal.nativeElement.click();
          this.listBien();
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
          this.lienPhotoretourPropriete = this.configService.urlg + ret.data;
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

  supContrat(lib: any) {
    alert(lib);
  }
}
