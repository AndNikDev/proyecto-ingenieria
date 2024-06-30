import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incidencia } from '../models/incidencias.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticoService {
  private selectedIncidenciaSubject: BehaviorSubject<Incidencia | null> =
    new BehaviorSubject<Incidencia | null>(null);
  selectedIncidencia$: Observable<Incidencia | null> =
    this.selectedIncidenciaSubject.asObservable();

  constructor(private firestore: AngularFirestore) {}

  // Método para obtener la incidencia seleccionada
  getSelectedIncidencia(): Incidencia | null {
    return this.selectedIncidenciaSubject.getValue();
  }

  // Método para actualizar la incidencia seleccionada
  setSelectedIncidencia(incidencia: Incidencia | null) {
    this.selectedIncidenciaSubject.next(incidencia);
  }

  async existeDiagnostico(idIncidencia: string): Promise<boolean> {
    const path = 'T_Diagnosticos';
    try {
      const snapshot = await this.firestore
        .collection(path, (ref) =>
          ref.where('CN_Id_Incidencia', '==', idIncidencia)
        )
        .get()
        .toPromise();
      return !snapshot?.empty;
    } catch (error) {
      console.error('Error checking diagnosis existence: ', error);
      throw error;
    }
  }
}
