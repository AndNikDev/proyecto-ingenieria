import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incidencia } from '../models/incidencias.model';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticoService {
  private selectedIncidenciaSubject: BehaviorSubject<Incidencia | null> =
    new BehaviorSubject<Incidencia | null>(null);
  selectedIncidencia$: Observable<Incidencia | null> =
    this.selectedIncidenciaSubject.asObservable();

  constructor() {}

  // Método para obtener la incidencia seleccionada
  getSelectedIncidencia(): Incidencia | null {
    return this.selectedIncidenciaSubject.getValue();
  }

  // Método para actualizar la incidencia seleccionada
  setSelectedIncidencia(incidencia: Incidencia | null) {
    this.selectedIncidenciaSubject.next(incidencia);
  }
}
