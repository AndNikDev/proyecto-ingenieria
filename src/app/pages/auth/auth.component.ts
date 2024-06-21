import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  emailControl: FormControl;
  passwordControl: FormControl;
  loginError: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
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

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    try {
      await this.authService.login(email, password);
      this.loginError = null; // Limpiar errores
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);
      this.loginError = error.message || 'Error en el inicio de sesión. Por favor, inténtelo de nuevo.';
    }
  }
}
