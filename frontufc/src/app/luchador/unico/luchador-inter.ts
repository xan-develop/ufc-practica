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
  finalizaciones: number;
  decisiones: number;
  kos: number;
  alias: string;
  altura: number;
}
export interface Pelea {
  luchadorid: number;
  pelea: number;
  nombre: string;
  evento: number;
  ganador: number;
  imagen: string
}

export interface listacombates{
  combate:number;
  evento: number;
  luchador1: string;
  idluchador1:number;
  img1: string;
  luchador2: string;
  idluchador2:number;
  img2: string;
  ganador: number;
}

