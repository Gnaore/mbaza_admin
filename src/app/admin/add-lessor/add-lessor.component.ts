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
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { MessageService } from 'primeng/api';
import { SmsService } from 'src/app/services/sms.service';
import { DatePipe } from '@angular/common';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}


@Component({
  selector: 'app-add-lessor',
  templateUrl: './add-lessor.component.html',
  styleUrls: ['./add-lessor.component.scss'],
  providers: [MessageService]
})
export class AddLessorComponent {

  uploadedFiles: any[] = [];


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

  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  primaryColour = this.configService.PrimaryWhite;
  secondaryColour = this.configService.SecondaryGrey;

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
    private toastr: ToastrService,
    private router: Router,
    private messageService: MessageService,
    private smsService: SmsService,
    private datePipe: DatePipe
  ) { }


  formatDate(): string {
    const currentDate = new Date();
    // Formater la date actuelle au format "YYYY-MM-DD HH:mm:ss"
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');
    return formattedDate || ''; // Assurer que la valeur retournée n'est pas nulle
  }

  formGroup!: FormGroup;
  formProprieteGroup!: FormGroup;
  eqpmtSup: boolean = false;
  banks: any[] = [];
  typesProprietes: any[] = [];
  selectedTypePropriete: any;
  selectedBank: any;
  listepropriete: any[] = [];
  id: any;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id !== '0')
      this.oneBailleur(this.id);
    this.initForm();
    this.allBanque();
    this.listeTypepropriete();
  }

  onUpload(event:UploadEvent) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
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
      bailleurTelHussier: [''],
      bailleurEmailHussier: ['']
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

  envoiSms(to: string, email: string, ){
    let text = "Bienvenue chez MBAAZA, Votre compte viens d'être ouvert sur la plateform des Bailleurs. Trouvez vos identifiant dans votre boite mail \n " + email 
    var boby = {
      sender:'MBAAZA',
      to: to,
      text: text,
      url: 'mbaaza.com',
      type: 'unicode',
      datetime: this.formatDate()
    }
    this.smsService.sms(boby).subscribe((ret)=>{
      this.toastr.success("SMS ENVOIE");
    },(error)=>{
      console.log(error);
      this.toastr.success("Erreur " + error );
    });
  }


  onSubmit(f: any) {
    this.isLoading = true;
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
      bailleurTelHussier: f.bailleurTelHussier,
      bailleurEmailHussier: f.bailleurEmailHussier,

    }

    // Subject: Ouverture de compte M'baaza
    // Message: 
    //    Bonjour cher abonné Mbaaza !
    //    Votre compte vient d'être créé avec succès.
    //    Pour accéder à votre espace bailleur, veuillez cliquer sur le lien suivant : <a href="">Accéder à mon espace</a>.
    //    Ci-dessous, vos identifiants de connexion :
    //      E-mail : <b>name@domain</b>.
    //      Mot de passe : <b>123</b>.
    //    Veuillez procéder à la modification de votre mot de passe après la première connexion.
    //    L'équipe de Mbaaza vous remercie pour votre confiance.

    if (!f.bailleurId) {
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
          this.ajoutUtilisateur(f, ret.data.bailleurId);
          this.isLoading = false;
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
          this.isLoading = false;
        }
      );
    } else {
      this.bailleurService.modifiBailleur(boby).subscribe(
        (ret) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Modification terminée avec succès',
            showConfirmButton: false,
            timer: 1500,
          });

          this.oneBailleur(f.bailleurId);
          this.isLoading = false;
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
          this.isLoading = false;
        }
      );
    }
    /* bailleurlienCNI,
    bailleurLienPhoto,*/
  }

  oneBailleur(id: any) {
    this.isLoading = true;
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
        this.formGroup.controls['banqueId'].setValue(ret.data.banque.banqueId);

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
        this.formGroup.controls['bailleurEmailHussier'].setValue(
          ret.data.bailleurEmailHussier
        );
        this.formGroup.controls['bailleurTelHussier'].setValue(
          ret.data.bailleurTelHussier
        );
        this.lienPhotoretour =
          this.configService.urlgimg + ret.data.bailleurlienCNI;
        this.file = ret.data.bailleurlienCNI;
        this.lienPhotoretour2 =
          this.configService.urlgimg + ret.data.bailleurLienPhoto;
        this.file2 = ret.data.bailleurLienPhoto;
        this.allProprieteByBailleur(id);
        this.isLoading = false;
      },
      (err) => {
        console.log(err.error.message);
        this.isLoading = false;
      }
    );
  }

  ajoutUtilisateur(f: any, bailleurId: number) {
    this.isLoading = true;

    var body = {
      contact: f.bailleurTelephone,
      email: f.bailleurEmail,
      paysId: 1,
      role: 'BAILLEUR',
      username: f.bailleurNomPrenoms,
      lienphoto: this.file2,
      bailleurId: bailleurId
    };

    this.usersService.saveUser(body).subscribe(
      (result) => {
        this.toastr.success("L'utilisateur créé avec succés");
        this.envoiSms(f.bailleurTelephone,f.bailleurEmail);
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
          this.lienPhotoretour = this.configService.urlgimg + ret.data;
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
          this.lienPhotoretour2 = this.configService.urlgimg + ret.data;
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
        this.isLoading = true
        this.proprieteService.supPropriete(proprieteId).subscribe(
          (ret) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Suppression terminée avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
            this.isLoading = false
            this.allProprieteByBailleur(this.id)
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

  resetPropriete() {
    this.formProprieteGroup.reset();
    this.formProprieteGroup.controls['bailleurId'].setValue(this.SauvID);
    // this.MbailleurId = SauvID;
  }

  submitPropriete(f: any) {
    var body = {
      proprieteId: parseInt(f.proprieteId),
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

    if (!f.proprieteId) {
      this.proprieteService.ajoutPropriete(body).subscribe((ret) => {
        console.log(ret.data);
        this.SauvID = this.MbailleurId;
        this.previewImagePropriete = '';
        this.lienPhotoretourPropriete = '';
        this.allProprieteByBailleur(this.MbailleurId);
        this.resetPropriete();
      });
    } else {
      this.proprieteService.modifiPropriete(body).subscribe((ret) => {
        this.SauvID = this.MbailleurId;
        this.previewImagePropriete = '';
        this.lienPhotoretourPropriete = '';
        this.allProprieteByBailleur(this.MbailleurId);
        this.resetPropriete();
      });
    }
  }

  setFormPropriete(f: any) {
    console.log(f);
    this.lienPhotoretourPropriete = this.configService.urlgimg + f.proprieteLienPhoto;
    this.formProprieteGroup.patchValue({
      proprieteId: f.proprieteId,
      proprieteAnnee: f.proprieteAnnee,
      proprieteSurface: f.proprieteSurface,
      proprieteNbrEtage: f.proprieteNbrEtage,
      proprieteNbrChambre: f.proprieteNbrChambre,
      proprieteNbreSalleBain: f.proprieteNbreSalleBain,
      proprieteDescription: f.proprieteDescription,
      proprieteStatu: f.proprieteStatu,
      proprietePrix: f.proprietePrix,
      proprietePret: f.proprietePret,
      proprieteJardin: f.proprieteJardin ?? false,
      proprietePiscine: f.proprietePiscine ?? false,
      proprieteGarage: f.proprieteGarage ?? false,
      proprieteBalcon: f.proprieteBalcon ?? false,
      proprieteChemine: f.proprieteChemine ?? false,
      proprieteClimatisation: f.proprieteClimatisation ?? false,
      proprieteEquipement: f.proprieteEquipement ?? false,
      proprieteequipementdetails: f.proprieteequipementdetails,
      proprieteLongitude: f.proprieteLongitude,
      proprieteLatitude: f.proprieteLatitude,
      proprieteQuartier: f.proprieteQuartier,
      proprieteLienPhoto: f.proprieteLienPhoto,
      bailleurId: this.MbailleurId,
      typebienId: f.typebien.typebienId,
      proprieteAdresse: f.proprieteAdresse,
    })
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
          this.formProprieteGroup.patchValue({
            proprieteLienPhoto: ret.data
          })
          this.lienPhotoretourPropriete = this.configService.urlgimg + ret.data;
          // this.previewImagePropriete =  ret.data;
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