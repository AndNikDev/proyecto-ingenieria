export interface Usuario {
  CN_Id_Usuario: number;
  CT_Nombre: string;
  CN_Cedula: number;
  CT_Puesto: string;
  CT_Correo: string;
  CT_Contrasena: string;
  CN_Celular: number;
  CN_Id_Departamento?: number;
  CN_Id_Rol?: number;
  CT_Id_Foto_Usuario?: string;
}

export interface roles{
  CN_Id_Rol: number;
  CT_Nombre_Rol: string;
}
