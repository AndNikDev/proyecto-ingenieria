import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  declarations: [AvatarComponent],
  exports: [AvatarComponent, ReactiveFormsModule],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
