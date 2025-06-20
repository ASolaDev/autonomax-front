import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-crear-proveedor',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './crear-proveedor.component.html',
    styleUrl: './crear-proveedor.component.css'
})
export class CrearProveedorComponent {

    constructor(private http: HttpClient, private proveedorService: ProveedoresService,
        private route: ActivatedRoute, private router: Router
    ) { }

    id: number | null = null;

    CrearProveedor = new FormGroup({
        nombreProveedor: new FormControl('', [Validators.required, Validators.minLength(3)]),
        cifProveedor: new FormControl('', [Validators.required, Validators.pattern(/^[ABCDEFGHJKLMNPQRSUVW]{1}[0-9]{7}([A-Z]|[0-9]){1}$/)]),
        tipoProveedor: new FormControl('', [Validators.required]),
        emailProveedor: new FormControl('', [Validators.required, Validators.email]),
        direccionProveedor: new FormControl('', [Validators.required, Validators.minLength(10)]),
        ciudadProveedor: new FormControl('', [Validators.required, Validators.minLength(4)]),
        provinciaProveedor: new FormControl('', [Validators.required, Validators.minLength(4)]),
        telefonoProveedor: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^\+[0-9]{1,3}[ -]?([0-9]{2,3}[ -]?){2}[0-9]{2,3}$/)])
    });

    get f() { return this.CrearProveedor.controls; }

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id != 0 && this.id != null) {
            this.proveedorService.getProveedorById(this.id!).subscribe(
                (proveedor) => {
                    this.CrearProveedor.patchValue({
                        nombreProveedor: proveedor.nombreProveedor,
                        cifProveedor: proveedor.cifProveedor,
                        tipoProveedor: proveedor.tipoProveedor,
                        emailProveedor: proveedor.emailProveedor,
                        direccionProveedor: proveedor.direccionProveedor,
                        ciudadProveedor: proveedor.ciudadProveedor,
                        provinciaProveedor: proveedor.provinciaProveedor,
                        telefonoProveedor: proveedor.telefonoProveedor
                    });
                },
                error => {
                    console.error('Error al cargar el proveedor:', error);
                }
            )
        }
    }

    onSubmit() {
        if (this.CrearProveedor.valid) {

            this.proveedorService.crearProveedor(this.CrearProveedor.value).subscribe(response => {
                return this.router.navigate(['/proveedores']);
            }, error => {
                console.error('Error al crear el proveedor:', error);
            });

        } else {
            this.CrearProveedor.markAllAsTouched();
        }
    }
}
