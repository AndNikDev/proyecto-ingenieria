import { FirestoreService } from 'src/app/services/firestore.service';
import { Incidencia } from 'src/app/models/incidencias.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Incidencias: Incidencia[] = [];

  constructor(
    @Inject(Router) private router: Router,
    public db: FirestoreService
  ) {}

  redirigir() {
    this.router.navigate(['/registrar-incidencia']);
  }

  extraerIncidencias() {
    const path = 'Incidencias/';
    this.db.getCollectionWithId<Incidencia>(path).subscribe((data) => {
      this.Incidencias = data;
    });
  }

  generarDiagnostico(idIncidencia: string) {
    this.router.navigate(['/diagnostico-incidencia', idIncidencia]);
  }

  getCategoriaNombre(id: number): string {
    const categorias = [
      { id: 1, nombre: 'Reparación' },
      { id: 2, nombre: 'Intervención por causas naturales' },
      { id: 3, nombre: 'Atención al mobiliario' },
    ];
    return (
      categorias.find((cat) => cat.id === id)?.nombre ||
      'En espera de asignación'
    );
  }

  getColorPrioridad(prioridad: number): string {
    switch (prioridad) {
      case 1:
        return 'green';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
      default:
        return 'gray';
    }
  }

  getEstadoNombre(id: number): string {
    const estados = [
      { id: 1, nombre: 'Registrado' },
      { id: 2, nombre: 'Asignado' },
      { id: 3, nombre: 'En revisión' },
      { id: 4, nombre: 'En reparación' },
      { id: 5, nombre: 'Pendiente de compra' },
      { id: 6, nombre: 'Terminado' },
      { id: 7, nombre: 'Aprobado' },
      { id: 8, nombre: 'Rechazado' },
      { id: 9, nombre: 'Cerrado' },
    ];
    return estados.find((est) => est.id === id)?.nombre || 'Desconocido';
  }

  ngOnInit() {
    this.extraerIncidencias();
  }
}
