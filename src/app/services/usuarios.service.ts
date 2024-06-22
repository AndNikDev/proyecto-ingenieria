// src/app/services/usuarios.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly collectionPath = 'T_Usuarios';

  constructor(private firestore: AngularFirestore) {}

  // Método para crear un usuario
  createUsuario(usuario: Usuario) {
    return this.firestore
      .collection<Usuario>(this.collectionPath)
      .doc(String(usuario.CN_Id_Usuario))
      .set(usuario);
  }

  // Método para obtener un usuario
  getUsuario(id: string) {
    return this.firestore
      .collection<Usuario>(this.collectionPath)
      .doc(id)
      .valueChanges();
  }

  // Método para obtener todos los usuarios
  getUsuarios() {
    return this.firestore.collection<Usuario>(this.collectionPath).valueChanges();
  }

  // Método para actualizar un usuario
  updateUsuario(usuario: Usuario) {
    return this.firestore
      .collection<Usuario>(this.collectionPath)
      .doc(String(usuario.CN_Id_Usuario))
      .update(usuario);
  }

  // Método para obtener roles
  getRoles() {
    return this.firestore.collection('T_Roles').valueChanges();
  }
}
