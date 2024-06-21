import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { roles } from '../models/usuario.model';

// ! si el codigo llega a fallar, entonces ponerle ? a los userSnapshot
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly SESSION_DURATION = 30 * 60 * 1000; // 30 minutos

  constructor(private db: AngularFirestore, private router: Router) {}

  async login(email: string, password: string): Promise<void> {
    try {
      const userSnapshot = await this.db.collection<Usuario>('T_Usuarios', ref =>
        ref.where('CT_Correo', '==', email).where('CT_Contrasena', '==', password)
      ).get().toPromise();

      if (userSnapshot?.empty) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      const user = userSnapshot?.docs[0].data();
      const userId = userSnapshot?.docs[0].id; // Obtener el ID del usuario

      const rolesSnapshot = await this.db.collection<roles>('T_Roles', ref =>
        ref.where('CN_Id_Rol', '==', user?.CN_Id_Rol)
      ).get().toPromise();

      const userRole = rolesSnapshot?.docs[0]?.data()?.CT_Nombre_Rol || 'usuario';

      // Guarda los detalles del usuario en localStorage
      localStorage.setItem('user', JSON.stringify({ ...user, id: userId }));
      localStorage.setItem('role', userRole);
      localStorage.setItem('session_expiry', (Date.now() + AuthService.SESSION_DURATION).toString());

      // Navegar a la página principal
      this.router.navigate(['/home']);
    } catch (error: any) {
      throw new Error(error.message || 'Error en el inicio de sesión');
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('session_expiry');
    this.router.navigate(['/login']);
  }

  getUser(): Usuario | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    const expiry = localStorage.getItem('session_expiry');
    if (expiry) {
      const isSessionActive = Date.now() < parseInt(expiry, 10);
      if (!isSessionActive) {
        this.logout();
      }
      return isSessionActive;
    }
    return false;
  }
}
