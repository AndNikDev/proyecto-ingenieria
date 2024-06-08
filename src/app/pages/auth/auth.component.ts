import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // Import the Router class

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  emailControl: FormControl;
  passwordControl: FormControl;
  loginError: string | null = null; // Variable para manejar errores de login

  constructor(
    private authService: AuthService,
    private router: Router // Inject the Router class
  ) {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordControl = new FormControl('', [Validators.required]);

    this.form = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  submit() {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.authService
      .login(email, password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
        this.loginError = null; // Limpiar errores
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión:', error);
        this.loginError = this.getErrorMessage(error); // Asignar mensaje de error
      });
  }

  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/invalid-email':
        return 'Correo electrónico no válido';
      default:
        return 'Error en el inicio de sesión. Por favor, inténtelo de nuevo.';
    }
  }
}
