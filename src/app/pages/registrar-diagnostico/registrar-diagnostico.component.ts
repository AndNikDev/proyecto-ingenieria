import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { Incidencia } from 'src/app/models/incidencias.model';
import { Diagnostico } from 'src/app/models/diagnosticos.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-diagnostico',
  templateUrl: './registrar-diagnostico.component.html',
  styleUrls: ['./registrar-diagnostico.component.scss'],
})
export class RegistrarDiagnosticoComponent implements OnInit {
  incidenciaClic: Incidencia | null = null;

  nuevoDiagnostico: Diagnostico = {
    CN_Id_Diagnostico: '',
    CF_Fecha_Hora: new Date(),
    CN_Id_Incidencia: '',
    CT_Diagnostico: '',
    CB_Requiere_Compra: false,
    CN_Tiempo_Estimado: 0,
    CT_Observaciones: '',
    CN_Id_Imagen: [''],
  };

  CN_Id_Estado: number | null = null;

  constructor(
    private ds: DiagnosticoService,
    public db: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ds.selectedIncidencia$.subscribe((incidencia) => {
      this.incidenciaClic = incidencia;
      if (this.incidenciaClic) {
        this.nuevoDiagnostico.CN_Id_Incidencia =
          this.incidenciaClic.CN_Id_Incidencia || '';
        this.CN_Id_Estado = this.incidenciaClic.CN_Id_Estado ?? null;
      }
    });

    this.nuevoDiagnostico.CN_Id_Diagnostico = this.generateCustomId();
  }

  generateCustomId(): string {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    const counter = '000001';

    return `${year}${month}${day}${hours}${minutes}${seconds}${counter}`;
  }

  async crearDiagnostico() {
    const pathDiagnostico = 'T_Diagnosticos/';
    const CN_Id_Diagnostico = this.nuevoDiagnostico.CN_Id_Diagnostico;
    if (!CN_Id_Diagnostico) {
      console.error('Error: CN_Id_Diagnostico is empty or undefined');
      return;
    }
    try {
      await this.db.createDoc(
        this.nuevoDiagnostico,
        pathDiagnostico,
        CN_Id_Diagnostico
      );
      console.log('Diagnóstico creado correctamente', CN_Id_Diagnostico);
      if (this.incidenciaClic) {
        const pathIncidencia = 'T_Incidencias/';
        const { CN_Id_Incidencia } = this.incidenciaClic;
        const nuevoEstado = this.CN_Id_Estado;
        const updatedIncidencia = { CN_Id_Estado: nuevoEstado };
        if (!CN_Id_Incidencia) {
          console.error('Error: CN_Id_Incidencia is empty or undefined');
          return;
        }
        await this.db.updateDoc(
          updatedIncidencia,
          pathIncidencia,
          CN_Id_Incidencia
        );
        console.log('Incidencia actualizada correctamente', CN_Id_Incidencia);
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error(
        'Error al crear el diagnóstico o actualizar la incidencia',
        error
      );
    }
  }
}
