import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-proveedor',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.css'
})
export class CrearProveedorComponent {

    constructor(private http:HttpClient, private proveedoresService:ProveedoresService){}

   CrearProveedor = new FormGroup({
        nombreProveedor: new FormControl('', [Validators.required, Validators.minLength(3)]),
        cifProveedor: new FormControl('', [Validators.required]),
        tipoProveedor: new FormControl(''), // sin validadores, opcional
        correoProveedor: new FormControl('', [Validators.required, Validators.email]),
        direccionProveedor: new FormControl('', [Validators.required, Validators.minLength(10)]),
        ciudadProveedor:new FormControl('',[Validators.required, Validators.minLength(4)]),
        provinciaProveedor: new FormControl('',[Validators.required,Validators.minLength(4)]),
        telefonoProveedor: new FormControl('',[Validators.required, Validators.minLength(9)])
        });
    get f() { return this.CrearProveedor.controls; }
}
