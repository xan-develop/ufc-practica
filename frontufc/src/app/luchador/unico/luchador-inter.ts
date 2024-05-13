export interface LuchadorInter {
  createdAt: string;
  derrotas: number | null;
  edad: number;
  especialidad: string;
  id: number;
  imagen: string;
  nacionalidad: string;
  nombre: string;
  pesoId: number;
  rango: number;
  updatedAt: string;
  victorias: number | null;
}
export interface Pelea {
  luchadorid: number;
  pelea: number;
  nombre: string;
  evento: number;
  ganador: number;
  imagen: string
}

