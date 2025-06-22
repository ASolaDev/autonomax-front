import { Proveedores } from './Proveedores';
import { Factura } from './Factura';
import { CategoriaGastos } from './CategoriaGastos';
import { Usuarios } from './Usuarios';

export enum MetodoPago {
    EFECTIVO = 'EFECTIVO',
    TARJETA = 'TARJETA',
    TRANSFERENCIA = 'TRANSFERENCIA',
    OTRO = 'OTRO'
}

export interface Gastos {
    idGasto?: number;
    usuario?: Usuarios;
    fecha: Date;
    descripcion: string;
    monto: number;
    categoria?: CategoriaGastos;
    metodoPago: MetodoPago;
    proveedor?: Proveedores;
    factura: Factura;
}
