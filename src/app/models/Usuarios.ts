export enum Rol {
    Administrador = 'Administrador',
    Usuario = 'Usuario'
}

export interface Usuarios {
    id?: number;
    nombreUsuario: string;
    email: string;
    password: string;
    rol?: Rol;
    // Puedes agregar facturas si lo necesitas: facturas?: Facturas[];
}
