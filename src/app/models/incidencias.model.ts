// incidencia.model.ts

export interface Incidencia {
  CF_Fecha_Hora_Registro?: Date;
  CN_Id_Usuario: string;
  CT_Titulo_Incidencia: string;
  CT_Descripcion: string;
  CT_Lugar: string;
  CN_Id_Imagenes?: string;
  CN_Id_Tecnico?: string;
  CN_Id_Estado?: string;
  CT_Justificacion_Estado?: string;
  CN_Id_Prioridad?: string;
  CN_Id_Riesgo?: string;
  CN_Id_Afectacion?: string;
  CN_Id_Categoria?: string;
  CD_Costos?: number;
  CN_Duracion_Gestion?: number;
}
