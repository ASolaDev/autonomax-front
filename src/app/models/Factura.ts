import { Cliente } from "./Cliente";
import { DetalleFactura } from "./DetalleFactura";

export interface Factura {
    id?: number;
    numeroFactura: string;
    fechaEmision: string;
    fechaPago?: string;
    subtotal: number;
    iva: number;
    cliente: Cliente;
    total: number;
    estado: string;
    facturasDetalles: DetalleFactura[];
    idUsuario?: number;
    idEmpresa?: number;
    idCliente?: number;
}
