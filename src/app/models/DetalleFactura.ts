export interface DetalleFactura {
    id?: any;
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    tipoIva: number;
    subtotal?: number;
}
