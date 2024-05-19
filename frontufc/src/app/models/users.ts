export interface User {
  id?:number;
  usuario: string;
  correo: string;
  clave: string;
}
export interface UserRole{
  userId?: number;
  roleId: number;
}

export interface UserRoleArray{
  usuario: string;
  roleId: number [];
}
