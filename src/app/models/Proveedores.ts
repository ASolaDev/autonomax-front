import { TipoProveedores } from "./TipoProveedores";

export interface Proveedores {
    id?: number;
    nombreProveedor: string;
    cifProveedor: string;
    direccionProveedor: string;
    emailProveedor: string;
    ciudadProveedor: string;
    provinciaProveedor: string;
    tipoProveedor?: TipoProveedores;
    telefonoProveedor: string;
}
