import { Factura } from "./Factura";
import { TipoCliente } from "./TipoCliente";

export interface Cliente {
    id: number;
    nombreCliente: string;
    cifCliente: string;
    direccionCliente: string;
    emailCliente: string;
    telefonoCliente: string;
    ciudadCliente: string;
    provinciaCliente: string;
    tipoCliente: TipoCliente
    facturas: Factura[];
}
