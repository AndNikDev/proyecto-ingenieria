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
  private contador: number;

  nuevoDiagnostico: Diagnostico = {
    CN_Id_Diagnostico: '',
    CF_Fecha_Hora: new Date(),
    CN_Id_Incidencia: '',
    CT_Diagnostico: '',
    CB_Requiere_Compra: false,
    CN_Tiempo_Estimado: 0,
    CT_Observaciones: '',
    CN_Id_Imagen: '',
  };

  CN_Id_Estado: number | null = null;

  constructor(
    private ds: DiagnosticoService,
    public db: FirestoreService,
    private router: Router
  ) {
    this.contador = 0;
  }

  async ngOnInit() {
    this.ds.selectedIncidencia$.subscribe((incidencia) => {
      this.incidenciaClic = incidencia;
      if (this.incidenciaClic) {
        this.nuevoDiagnostico.CN_Id_Incidencia =
          this.incidenciaClic.CN_Id_Incidencia || '';
        this.CN_Id_Estado = this.incidenciaClic.CN_Id_Estado ?? null;
      }
    });

    this.nuevoDiagnostico.CN_Id_Diagnostico = await this.generateCustomId();
  }

  async generateCustomId() {
    const incidenciaId = this.incidenciaClic?.CN_Id_Incidencia;
    let customId = '';
    let exist = true;

    while (exist) {
      this.contador++;
      const contadorStr = this.contador.toString().padStart(4, '0');
      customId = `${incidenciaId}-${contadorStr}`;
      exist = await this.db.docExists('T_Diagnosticos', customId);
    }

    return customId;
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
