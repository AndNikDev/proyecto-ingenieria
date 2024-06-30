import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { Incidencia } from 'src/app/models/incidencias.model';
import { Diagnostico } from 'src/app/models/diagnosticos.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-registrar-diagnostico',
  templateUrl: './registrar-diagnostico.component.html',
  styleUrls: ['./registrar-diagnostico.component.scss'],
})
export class RegistrarDiagnosticoComponent implements OnInit {
  incidenciaClic: Incidencia | null = null;
  newFiles: File[] = [];
  newImages: string[] = [];

  nuevoDiagnostico: Diagnostico = {
    CN_Id_Diagnostico: '', // Se asignará más adelante en ngOnInit
    CF_Fecha_Hora: new Date(),
    CN_Id_Incidencia: '', // Se asignará desde la incidencia seleccionada
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
    private router: Router,
    private fs: FirestorageService
  ) {}

  ngOnInit() {
    this.ds.selectedIncidencia$.subscribe((incidencia) => {
      this.incidenciaClic = incidencia;
      if (this.incidenciaClic) {
        this.nuevoDiagnostico.CN_Id_Diagnostico = this.incidenciaClic.CN_Id_Incidencia || '';
        this.nuevoDiagnostico.CN_Id_Incidencia = this.incidenciaClic.CN_Id_Incidencia || '';
        this.CN_Id_Estado = this.incidenciaClic.CN_Id_Estado ?? null;
      }
    });
  }

  allInputFilled = false;
  checkInputs() {
    this.allInputFilled =
      this.nuevoDiagnostico.CT_Diagnostico.trim() !== '' &&
      this.nuevoDiagnostico.CN_Tiempo_Estimado !== 0 &&
      this.incidenciaClic?.CN_Id_Estado?.toString().trim() !== '';
  }

  removeImage(index: number) {
    this.newFiles.splice(index, 1);
    this.newImages.splice(index, 1);
  }

  async newImagenUpload(event: any) {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const nombreImagen = `${this.nuevoDiagnostico.CN_Id_Diagnostico}_${file.name}`;

      try {
        const downloadURL = await this.fs.uploadImage(
          file,
          'diagnosticos', // Path donde quieres guardar las imágenes en Firebase Storage
          nombreImagen
        );
        this.newFiles.push(file);
        this.newImages.push(downloadURL);
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    }
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
