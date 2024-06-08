import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RegistrarIncidenciaComponent } from './registrar-incidencia/registrar-incidencia.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, RegistrarIncidenciaComponent],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class PagesModule {}
