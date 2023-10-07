import { TpyebienService } from './../../services/tpyebien.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  EmailValidator,
} from '@angular/forms';
import { Component } from '@angular/core';
import { BanqueService } from 'src/app/services/banque.service';
import { ConfigService } from 'src/app/services/config.service';
import { UploadService } from 'src/app/services/upload.service';
import { BailleurService } from 'src/app/services/bailleur.service';
import Swal from 'sweetalert2';
import {
  Route,
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { ProprieteService } from 'src/app/services/propriete.service';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-lessor',
  templateUrl: './add-lessor.component.html',
  styleUrls: ['./add-lessor.component.scss'],
})
export class AddLessorComponent {
  previewImage: any;
  lienPhotoretour: any;
  previewImage2: any;
  lienPhotoretour2: any;
  file: any;
  fileToUpload: any;
  file2: any;
  fileToUpload2: any;
  isLoading: boolean = false;
  MbailleurId: any;
  SauvID: any;

  listePropriete: any[] = [];

  previewImagePropriete: any;
  fileToUploadPropriete: any;
  lienPhotoretourPropriete: any;

  constructor(
    private banqueService: BanqueService,
    private formBuilder: FormBuilder,
    private configService: ConfigService,
    private uploadService: UploadService,
    private bailleurService: BailleurService,
    private activatedRoute: ActivatedRoute,
    private proprieteService: ProprieteService,
    private tpyebienService: TpyebienService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}

  formGroup!: FormGroup;
  formProprieteGroup!: FormGroup;
  eqpmtSup: boolean = false;
  banks: any[] = [];
  typesProprietes: any[] = [];
  selectedTypePropriete: any;
  selectedBank: any;
  listepropriete: any[] = [];

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.oneBailleur(id);
    this.initForm();
    this.allBanque();
    this.listeTypepropriete();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      bailleurId: [''],
      bailleurNomPrenoms: ['', Validators.required],
      bailleurTelephone: ['', Validators.required],
      bailleurAdresse: ['', Validators.required],
      bailleurEmail: ['', [Validators.email, Validators.required]],
      bailleurDateNaissance: ['', Validators.required],
      bailleurNumero: [''],
      banqueId: [],
      bailleurNumCompte: ['', Validators.required],
      bailleurRevenu: ['', Validators.required],
      bailleurTaux: ['', Validators.required],
      bailleurPersUrgence: [''],
      bailleurTelUrgence: [''],
      bailleurRelationUrgence: [''],
      bailleurlienCNI: [''],
      bailleurLienPhoto: [''],
    });

    this.formProprieteGroup = this.formBuilder.group({
      proprieteId: [''],
      proprieteCode: [''],
      proprieteAdresse: ['', Validators.required],
      proprieteAnnee: ['', Validators.required],
      proprieteSurface: [''],
      proprieteNbrEtage: [''],
      proprieteNbrChambre: [''],
      proprieteNbreSalleBain: [''],
      proprieteDescription: [''],
      proprieteStatu: ['', Validators.required],
      proprietePrix: ['', Validators.required],
      proprietePret: [''],
      proprieteJardin: [false],
      proprietePiscine: [false],
      proprieteGarage: [false],
      proprieteBalcon: [false],
      proprieteChemine: [false],
      proprieteClimatisation: [false],
      proprieteEquipement: [false],
      proprieteequipementdetails: [''],
      proprieteLongitude: [''],
      proprieteLatitude: [''],
      proprieteQuartier: [''],
      proprieteLienPhoto: ['', Validators.required],
      bailleurId: ['', Validators.required],
      typebienId: ['', Validators.required],
    });
  }

  listeTypepropriete() {
    this.tpyebienService.AllTypebien().subscribe((ret) => {
      this.typesProprietes = ret.data;
    });
  }

  onSubmit(f: any) {
    var boby = {
      bailleurId: f.bailleurId,
      bailleurNomPrenoms: f.bailleurNomPrenoms,
      bailleurTelephone: f.bailleurTelephone,
      bailleurAdresse: f.bailleurAdresse,
      bailleurEmail: f.bailleurEmail,
      bailleurDateNaissance: f.bailleurDateNaissance + 'T00:00:00.000Z',
      bailleurNumero: f.bailleurNumero,
      banqueId: parseInt(f.banqueId),
      bailleurNumCompte: f.bailleurNumCompte,
      bailleurRevenu: parseInt(f.bailleurRevenu),
      bailleurTaux: parseFloat(f.bailleurTaux),
      bailleurPersUrgence: f.bailleurPersUrgence,
      bailleurTelUrgence: f.bailleurTelUrgence,
      bailleurRelationUrgence: f.bailleurRelationUrgence,
      bailleurlienCNI: this.file,
      bailleurLienPhoto: this.file2,
    };

    this.bailleurService.ajoutBailleur(boby).subscribe(
      (ret) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Enregistrement terminé avec succès',
          showConfirmButton: false,
          timer: 1500,
        });

        this.oneBailleur(ret.data.bailleurId);
        this.ajoutUtilisateur(f);
        /*this.formGroup.reset();
        this.lienPhotoretour2 = '';
        this.file2 = '';
        this.previewImage2 = '';
        this.fileToUpload2 = '';

        this.lienPhotoretour = '';
        this.file = '';
        this.previewImage = '';
        this.fileToUpload = '';*/
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
        });
      }
    );
    /* bailleurlienCNI,
    bailleurLienPhoto,*/
  }

  oneBailleur(id: any) {
    this.bailleurService.onebailleur(id).subscribe(
      (ret) => {
        this.MbailleurId = ret.data.bailleurId;
        this.formGroup.controls['bailleurId'].setValue(ret.data.bailleurId);
        this.formGroup.controls['bailleurNomPrenoms'].setValue(
          ret.data.bailleurNomPrenoms
        );
        this.formGroup.controls['bailleurTelephone'].setValue(
          ret.data.bailleurTelephone
        );
        this.formGroup.controls['bailleurAdresse'].setValue(
          ret.data.bailleurAdresse
        );
        this.formGroup.controls['bailleurEmail'].setValue(
          ret.data.bailleurEmail
        );
        this.formGroup.controls['bailleurDateNaissance'].setValue(
          ret.data.bailleurDateNaissance.substring(0, 10)
        );
        this.formGroup.controls['bailleurNumero'].setValue(
          ret.data.bailleurNumero
        );
        this.formGroup.controls['banqueId'].setValue(ret.data.banqueId);
        this.selectedBank = {
          sigleBanque: ret.data.banque.sigleBanque,
          banqueId: ret.data.banqueId,
          pays: {
            codePays: ret.data.banque.pays.codePays,
          },
        };

        // this.formGroup.controls['banqueId'].setValue(ret.data.banqueId);
        this.formGroup.controls['bailleurNumCompte'].setValue(
          ret.data.bailleurNumCompte
        );
        this.formGroup.controls['bailleurRevenu'].setValue(
          ret.data.bailleurRevenu
        );
        this.formGroup.controls['bailleurTaux'].setValue(ret.data.bailleurTaux);
        this.formGroup.controls['bailleurPersUrgence'].setValue(
          ret.data.bailleurPersUrgence
        );
        this.formGroup.controls['bailleurTelUrgence'].setValue(
          ret.data.bailleurTelUrgence
        );
        this.formGroup.controls['bailleurRelationUrgence'].setValue(
          ret.data.bailleurRelationUrgence
        );
        this.lienPhotoretour =
          this.configService.urlg + ret.data.bailleurlienCNI;
        this.file = ret.data.bailleurlienCNI;
        this.lienPhotoretour2 =
          this.configService.urlg + ret.data.bailleurLienPhoto;
        this.file2 = ret.data.bailleurLienPhoto;
        this.allProprieteByBailleur(id);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  ajoutUtilisateur(f: any) {
    this.isLoading = true;

    var body = {
      contact: f.bailleurTelephone,
      email: f.bailleurEmail,
      paysId: 1,
      role: 'BAILLEUR',
      username: f.bailleurNomPrenoms,
      lienphoto: this.file2,
    };

    this.usersService.saveUser(body).subscribe(
      (result) => {
        this.toastr.success("L'utilisateur créé avec succés");
      },
      (err) => {
        this.toastr.error(err);
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  allBanque() {
    this.banqueService.AllBanque().subscribe(
      (ret) => {
        this.banks = ret.data;
      },
      (err) => {
        console.log(err.console.error.message);
      }
    );
  }

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
  onFileChange2(event: any) {
    this.lienPhotoretour2 = '';
    this.file2 = '';
    if (event.target.files.length > 0) {
      const file2 = event.target.files[0];
      this.previewImage2 = file2.name;
      this.fileToUpload2 = file2;
      const formData = new FormData();
      formData.append('file', this.fileToUpload2);
      this.uploadService.upload(formData).subscribe(
        (ret) => {
          console.log(ret);
          this.lienPhotoretour2 = this.configService.urlg + ret.data;
          this.onFileChange2 = ret.data;
          this.file2 = ret.data;
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

  /////PROPRIETE--------
  allPropriete() {
    this.proprieteService.AllPropriete().subscribe((ret) => {
      this.listepropriete = ret.data;
      console.log(this.listepropriete);
    });
  }

  allProprieteByBailleur(id: any) {
    this.proprieteService.allProprieteByBailleur(id).subscribe((ret) => {
      this.listepropriete = ret.data;
      console.log(this.listepropriete);
    });
  }

  supPropriete(proprieteId: any) {
    alert(proprieteId);
  }

  resetPropriete() {
    this.formProprieteGroup.reset();
    this.formProprieteGroup.controls['bailleurId'].setValue(this.SauvID);
   // this.MbailleurId = SauvID;
  }

  submitPropriete(f: any) {
    var body = {
      proprieteAnnee: parseInt(f.proprieteAnnee),
      proprieteSurface: parseFloat(f.proprieteSurface),
      proprieteNbrEtage: parseInt(f.proprieteNbrEtage),
      proprieteNbrChambre: parseInt(f.proprieteNbrChambre),
      proprieteNbreSalleBain: parseInt(f.proprieteNbreSalleBain),
      proprieteDescription: f.proprieteDescription,
      proprieteStatu: f.proprieteStatu,
      proprietePrix: parseFloat(f.proprietePrix),
      proprietePret: parseFloat(f.proprietePret),
      proprieteJardin: f.proprieteJardin ?? false,
      proprietePiscine: f.proprietePiscine ?? false,
      proprieteGarage: f.proprieteGarage ?? false,
      proprieteBalcon: f.proprieteBalcon ?? false,
      proprieteChemine: f.proprieteChemine ?? false,
      proprieteClimatisation: f.proprieteClimatisation ?? false,
      proprieteEquipement: f.proprieteEquipement ?? false,
      proprieteequipementdetails: f.proprieteequipementdetails,
      proprieteLongitude: parseFloat(f.proprieteLongitude),
      proprieteLatitude: parseFloat(f.proprieteLatitude),
      proprieteQuartier: f.proprieteQuartier,
      proprieteLienPhoto: f.proprieteLienPhoto,
      bailleurId: parseInt(this.MbailleurId),
      typebienId: parseInt(f.typebienId),
      proprieteAdresse: f.proprieteAdresse,
    };

    this.proprieteService.ajoutPropriete(body).subscribe((ret) => {
      console.log(ret.data);
      this.SauvID = this.MbailleurId;
      this.previewImagePropriete = '';
      this.lienPhotoretourPropriete = '';
      this.allProprieteByBailleur(this.MbailleurId);
      this.resetPropriete();
    });
  }

  onFileChangePropriete(event: any) {
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
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.previewImagePropriete = '';
          this.isLoading = false;
        }
      );
    }
  }
}
