import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { Incidencia } from 'src/app/models/incidencias.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-asignacion-incidencia',
  templateUrl: './asignacion-incidencia.component.html',
  styleUrls: ['./asignacion-incidencia.component.scss'],
})
export class AsignacionIncidenciaComponent implements OnInit {
  incidencia: Incidencia | null = null;
  tecnicos: Usuario[] = [];
  selectedTecnico: number | null = null;
  imagenesArray: string[] = [];

  constructor(
    private ds: DiagnosticoService,
    private db: FirestoreService,
    private us: UsuariosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ds.selectedIncidencia$.subscribe((incidencia) => {
      this.incidencia = incidencia;
      if (this.incidencia) {
        // Convertir la cadena de URLs a un array
        this.imagenesArray = this.incidencia.CN_Id_Imagenes?.split(',') || [];
      }
    });

    this.loadTecnicos();
  }

  async loadTecnicos() {
    this.us.getUsuarios().subscribe((usuarios) => {
      this.tecnicos = usuarios.filter((usuario) => usuario.CN_Id_Rol.includes(4));
    });
  }

  async onSubmit() {
    if (this.incidencia && this.selectedTecnico !== null) {
      const updatedIncidencia = {
        ...this.incidencia,
        CN_Id_Tecnico: this.selectedTecnico,
        CN_Id_Estado: 2 // por ejemplo, si la asignación cambia el estado a "Asignado"
      };

      try {
        await this.db.updateDoc(updatedIncidencia, 'T_Incidencias', this.incidencia.CN_Id_Incidencia!);
        console.log('Incidencia actualizada correctamente');
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al actualizar la incidencia', error);
      }
    } else {
      console.error('Error: Incidencia o técnico no seleccionado');
    }
  }
}
