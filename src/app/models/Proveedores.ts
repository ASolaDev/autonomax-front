export interface Proveedores {
  id?: number;  // Opcional porque suele ser generado en backend
  nombreProveedor: string;
  cifProveedor: string;
  direccionProveedor: string;
  emailProveedor: string;
  ciudadProveedor: string;
  provinciaProveedor: string;
  //tipoProveedor?: TipoProveedor;  // Opcional porque no tiene nullable = false
  telefonoProveedor: string;
}
