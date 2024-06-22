import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss'],
})
export class RegistroUsuariosComponent implements OnInit {
  registroForm: FormGroup;
  roles: any[] = [];
  selectedRoles: number[] = [];

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
  ) {
    this.registroForm = this.fb.group({
      CN_Id_Usuario: [Date.now(), Validators.required], // Puedes usar Date.now() para generar un ID único
      CT_Nombre: ['', Validators.required],
      CN_Cedula: ['', Validators.required],
      CT_Puesto: ['', Validators.required],
      CT_Correo: ['', [Validators.required, Validators.email]],
      CT_Contrasena: ['', Validators.required],
      CN_Celular: ['', Validators.required],
      CN_Id_Departamento: [null],
    });
  }

  ngOnInit() {
    this.usuariosService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  isCheckedAndDisabled(roleId: number): boolean {
    return roleId === 2;
  }

  onRoleChange(event: any, roleId: number) {
    if (event.detail.checked) {
      this.selectedRoles.push(roleId);
    } else {
      const index = this.selectedRoles.indexOf(roleId);
      if (index > -1) {
        this.selectedRoles.splice(index, 1);
      }
    }
    if (!this.selectedRoles.includes(2)) {
      this.selectedRoles.push(2);
    }
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      return;
    }

    const usuario: Usuario = {
      ...this.registroForm.value,
      CN_Id_Rol: this.selectedRoles,
    };

    this.usuariosService
      .createUsuario(usuario)
      .then(() => {
        console.log('Usuario registrado con éxito');
        this.registroForm.reset();
        this.selectedRoles = [];
      })
      .catch((error) => {
        console.error('Error al registrar el usuario:', error);
      });
      this.router.navigate(['/home']);
  }
}
