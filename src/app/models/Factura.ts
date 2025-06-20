import { Cliente } from "./Cliente";
import { DetalleFactura } from "./DetalleFactura";

export interface Factura {
    id?: number;
    numeroFactura: string;
    fechaEmision: string; // Usar string para fechas ISO en Angular
    fechaPago?: string;
    subtotal: number;
    iva: number;
    cliente: Cliente;
    total: number;
    estado: string; // O puedes usar un enum si tienes los mismos valores que en Java
    facturasDetalles: DetalleFactura[];
    idUsuario?: number;
    idEmpresa?: number;
    idCliente?: number;
}
