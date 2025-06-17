import { TipoProveedores } from "./TipoProveedores";

export interface Proveedores {
  id?: number;  // Opcional porque suele ser generado en backend
  nombreProveedor: string;
  cifProveedor: string;
  direccionProveedor: string;
  emailProveedor: string;
  ciudadProveedor: string;
  provinciaProveedor: string;
  tipoProveedor?: TipoProveedores;  // Opcional porque no tiene nullable = false
  telefonoProveedor: string;
}
