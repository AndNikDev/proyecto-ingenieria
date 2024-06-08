import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Incidencia } from 'src/app/models/incidencias.model';

@Component({
  selector: 'app-card-incidencias',
  templateUrl: './card-incidencias.component.html',
  styleUrls: ['./card-incidencias.component.scss'],
})
export class CardIncidenciasComponent {
  @Input()
  incidencia!: Incidencia;
  @Output() generarDiagnostico: EventEmitter<string> = new EventEmitter();

  expanded: boolean = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  onGenerarDiagnostico() {
    this.generarDiagnostico.emit(this.incidencia.CN_Id_Incidencia);
  }
}
