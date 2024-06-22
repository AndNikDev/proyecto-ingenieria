export interface Diagnostico {
  CN_Id_Diagnostico: string;
  CF_Fecha_Hora: Date;
  CN_Id_Incidencia: string;
  CT_Diagnostico: string;
  CB_Requiere_Compra: boolean;
  CN_Tiempo_Estimado: number;
  CT_Observaciones?: string;
  CN_Id_Imagen?: string;
}
