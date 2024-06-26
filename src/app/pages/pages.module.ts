import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RegistrarIncidenciaComponent } from './registrar-incidencia/registrar-incidencia.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegistrarDiagnosticoComponent } from './registrar-diagnostico/registrar-diagnostico.component';
import { AuthComponent } from './auth/auth.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { AsignacionIncidenciaComponent } from './asignacion-incidencia/asignacion-incidencia.component';
import { FinalizarIncidenciaComponent } from './finalizar-incidencia/finalizar-incidencia.component';

@NgModule({
  declarations: [
    AuthComponent,
    HomeComponent,
    RegistrarIncidenciaComponent,
    RegistrarDiagnosticoComponent,
    RegistroUsuariosComponent,
    AsignacionIncidenciaComponent,
    FinalizarIncidenciaComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, SharedModule],
})
export class PagesModule {}
