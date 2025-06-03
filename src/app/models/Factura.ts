import { DetalleFactura } from "./DetalleFactura";

export interface Factura {
    numero: string;
    cliente: string;
    emision: string;
    pago: string;
    total: string;
    estado: string;
    detalles?: DetalleFactura[];
}
