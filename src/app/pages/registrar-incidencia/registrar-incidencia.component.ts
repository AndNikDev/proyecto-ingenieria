import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Incidencia } from 'src/app/models/incidencias.model';

@Component({
  selector: 'app-registrar-incidencia',
  templateUrl: './registrar-incidencia.component.html',
  styleUrls: ['./registrar-incidencia.component.scss'],
})
export class RegistrarIncidenciaComponent implements OnInit {
  private anioActual: string;
  private contador: number;
  // datos para el form
  nuevaIncidencia: Incidencia = {
    CF_Fecha_Hora_Registro: new Date(),
    CN_Id_Usuario: '',
    CT_Titulo_Incidencia: '',
    CT_Descripcion: '',
    CT_Lugar: '',
    CN_Id_Imagenes: '',
    CN_Id_Tecnico: '',
    CN_Id_Estado: '',
    CT_Justificacion_Estado: '',
    CN_Id_Prioridad: '',
    CN_Id_Riesgo: '',
    CN_Id_Afectacion: '',
    CN_Id_Categoria: '',
    CD_Costos: NaN,
    CN_Duracion_Gestion: NaN,
  };

  constructor(public db: FirestoreService) {
    this.anioActual = this.obtenerAnioActual();
    this.contador = 0;
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  private obtenerAnioActual(): string {
    const now = new Date();
    return now.getFullYear().toString();
  }

  public generarId(): string {
    const anioActual = this.obtenerAnioActual();
    if (anioActual !== this.anioActual) {
      this.anioActual = anioActual;
      this.contador = 0;
    }
    this.contador++;
    const contadorStr = this.contador.toString().padStart(6, '0');
    return `${this.anioActual}-${contadorStr}`;
  }

  crearIncidencia() {
    const path = 'Incidencias/';
    const CN_Id_Incidencia = this.generarId();
    if (path !== undefined) {
      this.db
        .createDoc(this.nuevaIncidencia, path, CN_Id_Incidencia)
        .then(() => {
          console.log('Incidencia creada con ID:', CN_Id_Incidencia);
        })
        .catch((error) => {
          console.error('Error al crear incidencia:', error);
        });
    } else {
      console.error('Error: Path is undefined');
    }
  }

  enableButton() {}
}
