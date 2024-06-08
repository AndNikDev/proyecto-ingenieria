import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { Incidencia } from 'src/app/models/incidencias.model';

@Component({
  selector: 'app-registrar-diagnostico',
  templateUrl: './registrar-diagnostico.component.html',
  styleUrls: ['./registrar-diagnostico.component.scss'],
})
export class RegistrarDiagnosticoComponent implements OnInit {
  incidenciaClic: Incidencia | null = null;

  constructor(private ds: DiagnosticoService) {}

  ngOnInit() {
    // Suscribirse al observable selectedIncidencia$ para obtener la incidencia seleccionada
    this.ds.selectedIncidencia$.subscribe((incidencia) => {
      this.incidenciaClic = incidencia;
    });
  }
}
