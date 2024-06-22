import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { FirestorageService } from '../../../services/firestorage.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss'],
})
export class ProfilePhotoComponent {
  user: any;

  constructor(
    private actionSheetController: ActionSheetController,
    private firestorageService: FirestorageService,
    private usuariosService: UsuariosService
  ) {
    this.loadUser();
  }

  loadUser() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Agregar imagen',
          handler: () => {
            this.selectImage();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const path = `usuarios/${this.user.id}`;
        const fileName = `profile_${Date.now()}.jpg`;
        const downloadURL = await this.firestorageService.uploadImage(file, path, fileName);
        this.user.CT_Id_Foto_Usuario = downloadURL;
        this.usuariosService.updateUsuario(this.user).then(() => {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.loadUser();
        });
      }
    };
    input.click();
  }
}
