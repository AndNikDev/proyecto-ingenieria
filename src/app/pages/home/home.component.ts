import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { AuthService } from 'src/app/services/auth.service';
import { Incidencia } from 'src/app/models/incidencias.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('toggleHeight', [
      state('visible', style({ height: '*', opacity: 1 })),
      state('hidden', style({ height: 0, opacity: 0 })),
      transition('visible <=> hidden', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  Incidencias: Incidencia[] = [];
  expanded: { [key: string]: boolean } = {};
  userRoles: number[] = []; // Almacenar roles del usuario actual

  constructor(
    private router: Router,
    public db: FirestoreService,
    private ds: DiagnosticoService,
    private authService: AuthService // Servicio de autenticación
  ) {}

  ngOnInit() {
    this.userRoles = this.authService.getRoles(); // Obtener roles del usuario actual
    this.extraerIncidencias();
  }

  redirigir() {
    this.router.navigate(['/registrar-incidencia']);
  }

  extraerIncidencias() {
    const path = 'T_Incidencias/';
    this.db.getCollectionWithId<Incidencia>(path).subscribe((data) => {
      this.Incidencias = data;
      // Inicializar el estado de visibilidad para cada incidencia
      this.Incidencias.forEach((incidencia) => {
        this.expanded[incidencia.CN_Id_Incidencia!] = false;
      });
    });
  }

  toggleCollapse(incidencia: Incidencia) {
    const id = incidencia.CN_Id_Incidencia;
    if (id !== undefined) {
      this.expanded[id] = !this.expanded[id];
    }
  }

  onGenerarDiagnostico(incidencia: Incidencia) {
    this.ds.setSelectedIncidencia(incidencia);
    this.router.navigate(['/registrar-diagnostico']);
  }

  onAsignarIncidencia(incidencia: Incidencia) {
    this.ds.setSelectedIncidencia(incidencia);
    this.router.navigate(['/asignacion-incidencia']);
  }

  onFinalizarDiagnostico(incidencia: Incidencia) {
    this.ds.setSelectedIncidencia(incidencia);
    this.router.navigate(['/finalizar-diagnostico']);
  }

  onCerrarIncidencia(incidencia: Incidencia) {
    this.ds.setSelectedIncidencia(incidencia);
    this.router.navigate(['/cerrar-incidencia']);
  }

  mostrarBotonGenerarDiagnostico(incidencia: Incidencia): boolean {
    const rolTecnico = 4;
    return (
      this.userRoles.includes(rolTecnico) &&
      !this.existeDiagnostico(incidencia.CN_Id_Incidencia!)
    );
  }

  mostrarBotonFinalizarDiagnostico(incidencia: Incidencia): boolean {
    const rolTecnico = 4;
    return (
      this.userRoles.includes(rolTecnico) &&
      this.existeDiagnostico(incidencia.CN_Id_Incidencia!)
    );
  }

  mostrarBotonAsignarIncidencia(incidencia: Incidencia): boolean {
    const rolEncargado = 3;
    const estadoRegistrado = 1;
    const estadoRechazado = 8;
    return (
      this.userRoles.includes(rolEncargado) &&
      (incidencia.CN_Id_Estado === estadoRegistrado ||
        incidencia.CN_Id_Estado === estadoRechazado)
    );
  }

  mostrarBotonCerrarIncidencia(incidencia: Incidencia): boolean {
    const rolSupervisor = 5;
    const estadoTerminado = 6;
    return (
      this.userRoles.includes(rolSupervisor) &&
      incidencia.CN_Id_Estado === estadoTerminado
    );
  }

  existeDiagnostico(idIncidencia: string): boolean {
    if (idIncidencia) {
      return false;
    }
    return true;
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

  handleRefresh(event: { target: { complete: () => void } }) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 1000);
  }
}
