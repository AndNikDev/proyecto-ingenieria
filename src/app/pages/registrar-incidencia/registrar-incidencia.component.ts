import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Incidencia } from 'src/app/models/incidencias.model';
import { Router } from '@angular/router';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-registrar-incidencia',
  templateUrl: './registrar-incidencia.component.html',
  styleUrls: ['./registrar-incidencia.component.scss'],
})
export class RegistrarIncidenciaComponent implements OnInit {
  private anioActual: string;
  private contador: number;
  newFiles: File[] = [];
  newImages: string[] = [];

  usuarioString = localStorage.getItem('user');
  usuario = this.usuarioString ? JSON.parse(this.usuarioString) : null;

  nuevaIncidencia: Incidencia = {
    CN_Id_Incidencia: '',
    CF_Fecha_Hora_Registro: new Date(),
    CN_Id_Usuario: this.usuario ? Number(this.usuario.CN_Id_Usuario) : NaN,
    CT_Titulo_Incidencia: '',
    CT_Descripcion: '',
    CT_Lugar: '',
    CN_Id_Imagenes: '',
    CN_Id_Tecnico: NaN,
    CN_Id_Estado: 1,
    CT_Justificacion_Estado: '',
    CN_Id_Prioridad: NaN,
    CN_Id_Riesgo: NaN,
    CN_Id_Afectacion: NaN,
    CN_Id_Categoria: NaN,
    CD_Costos: NaN,
    CN_Duracion_Gestion: NaN,
  };

  constructor(
    public db: FirestoreService,
    private router: Router,
    public dbFotos: FirestorageService
  ) {
    this.anioActual = this.obtenerAnioActual();
    this.contador = 0;
  }

  async newImagenUpload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const files: File[] = Array.from(event.target.files);
      let file: File;
      for (file of files) {
        this.newFiles.push(file);
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target) {
            this.newImages.push(event.target.result as string);
            this.checkInputs();
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.newFiles.splice(index, 1);
    this.newImages.splice(index, 1);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  private obtenerAnioActual(): string {
    const now = new Date();
    return now.getFullYear().toString();
  }

  private async generarId(): Promise<string> {
    const anioActual = this.obtenerAnioActual();
    if (anioActual !== this.anioActual) {
      this.anioActual = anioActual;
      this.contador = 0;
    }
    let uniqueId = '';
    let exists = true;
    while (exists) {
      this.contador++;
      const contadorStr = this.contador.toString().padStart(6, '0');
      uniqueId = `${this.anioActual}-${contadorStr}`;
      exists = await this.db.docExists('T_Incidencias', uniqueId);
    }

    this.nuevaIncidencia.CN_Id_Incidencia = uniqueId;
    return uniqueId;
  }

  allInputFilled = false;
  checkInputs() {
    this.allInputFilled =
      this.nuevaIncidencia.CT_Titulo_Incidencia.trim() !== '' &&
      this.nuevaIncidencia.CT_Lugar.trim() !== '' &&
      this.nuevaIncidencia.CT_Descripcion.trim() !== '';
  }

  resetInputs() {
    this.nuevaIncidencia = {
      CN_Id_Usuario: NaN,
      CT_Titulo_Incidencia: '',
      CT_Lugar: '',
      CT_Descripcion: '',
    };
    this.allInputFilled = false;
    this.newFiles = [];
    this.newImages = [];
  }

  async crearIncidencia() {
    const path = 'T_Incidencias/';
    const CN_Id_Incidencia = await this.generarId();
    if (path !== undefined) {
      const imageUploadPromises = this.newFiles.map((file) => {
        const nombreImagen = `${CN_Id_Incidencia}_${new Date().getTime()}_${
          file.name
        }`;
        return this.dbFotos.uploadImage(file, path, nombreImagen);
      });

      const imageUrls = await Promise.all(imageUploadPromises);

      if (imageUrls.length > 0) {
        this.nuevaIncidencia.CN_Id_Imagenes = imageUrls.join(',');
      }

      this.db
        .createDoc(this.nuevaIncidencia, path, CN_Id_Incidencia)
        .then(() => {
          console.log('Incidencia creada con ID:', CN_Id_Incidencia);
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.error('Error al crear incidencia:', error);
        });
    } else {
      console.error('Error: Path is undefined');
    }
    setTimeout(() => {
      this.resetInputs();
    }, 3000);
  }
}
