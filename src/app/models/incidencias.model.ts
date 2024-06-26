export interface Incidencia {
  CN_Id_Incidencia?: string;
  CF_Fecha_Hora_Registro?: Date;
  CN_Id_Usuario: number;
  CT_Titulo_Incidencia: string;
  CT_Descripcion: string;
  CT_Lugar: string;
  CN_Id_Imagenes?: string;
  CN_Id_Tecnico?: number;
  CN_Id_Estado?: number;
  CT_Justificacion_Estado?: string;
  CN_Id_Prioridad?: number;
  CN_Id_Riesgo?: number;
  CN_Id_Afectacion?: number;
  CN_Id_Categoria?: number;
  CD_Costos?: number;
  CN_Duracion_Gestion?: number;
}
