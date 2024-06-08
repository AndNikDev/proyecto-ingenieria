import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CardIncidenciasComponent } from './components/card-incidencias/card-incidencias.component';

@NgModule({
  declarations: [AvatarComponent, CardIncidenciasComponent],
  exports: [AvatarComponent, CardIncidenciasComponent, ReactiveFormsModule],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
