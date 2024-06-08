import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Incidencia } from 'src/app/models/incidencias.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-incidencia',
  templateUrl: './registrar-incidencia.component.html',
  styleUrls: ['./registrar-incidencia.component.scss'],
})
export class RegistrarIncidenciaComponent implements OnInit {
  private anioActual: string;
  private contador: number;
  nuevaIncidencia: Incidencia = {
    CN_Id_Incidencia: '',
    CF_Fecha_Hora_Registro: new Date(),
    CN_Id_Usuario: '',
    CT_Titulo_Incidencia: '',
    CT_Descripcion: '',
    CT_Lugar: '',
    CN_Id_Imagenes: '',
    CN_Id_Tecnico: '',
    CN_Id_Estado: 1,
    CT_Justificacion_Estado: '',
    CN_Id_Prioridad: NaN,
    CN_Id_Riesgo: NaN,
    CN_Id_Afectacion: NaN,
    CN_Id_Categoria: NaN,
    CD_Costos: NaN,
    CN_Duracion_Gestion: NaN,
  };

  constructor(public db: FirestoreService, private router: Router) {
    this.anioActual = this.obtenerAnioActual();
    this.contador = 0;
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
      exists = await this.db.docExists('Incidencias', uniqueId);
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
      CN_Id_Usuario: '',
      CT_Titulo_Incidencia: '',
      CT_Lugar: '',
      CT_Descripcion: '',
    };
    this.allInputFilled = false;
  }
  async crearIncidencia() {
    const path = 'Incidencias/';
    const CN_Id_Incidencia = await this.generarId();
    if (path !== undefined) {
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
