import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [AvatarComponent, CustomInputComponent, LogoComponent],
  exports: [
    AvatarComponent,
    ReactiveFormsModule,
    CustomInputComponent,
    LogoComponent,
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
