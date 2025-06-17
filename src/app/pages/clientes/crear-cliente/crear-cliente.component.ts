import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../../services/clientes.service';

@Component({
    selector: 'app-crear-cliente',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './crear-cliente.component.html',
    styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent {
    constructor(private http: HttpClient, private clientesService: ClientesService,
        private route: ActivatedRoute, private router: Router
    ) { }

    id: number | null = null;

    CrearCliente = new FormGroup({
        nombreCliente: new FormControl('', [Validators.required, Validators.minLength(3)]),
        cifCliente: new FormControl('', [Validators.required, Validators.pattern(/^[ABCDEFGHJKLMNPQRSUVW]{1}[0-9]{7}([A-Z]|[0-9]){1}$/)]),
        tipoCliente: new FormControl('', [Validators.required]), // sin validadores, opcional
        emailCliente: new FormControl('', [Validators.required, Validators.email]),
        direccionCliente: new FormControl('', [Validators.required, Validators.minLength(10)]),
        ciudadCliente: new FormControl('', [Validators.required, Validators.minLength(4)]),
        provinciaCliente: new FormControl('', [Validators.required, Validators.minLength(4)]),
        telefonoCliente: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^\+[0-9]{1,3}[ -]?([0-9]{2,3}[ -]?){2}[0-9]{2,3}$/)])
    });
    get f() { return this.CrearCliente.controls; }

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.clientesService.getClienteById(this.id!).subscribe(
            (cliente) => {
                this.CrearCliente.patchValue({
                    nombreCliente: cliente.nombreCliente,
                    cifCliente: cliente.cifCliente,
                    tipoCliente: cliente.tipoCliente,
                    emailCliente: cliente.emailCliente,
                    direccionCliente: cliente.direccionCliente,
                    ciudadCliente: cliente.ciudadCliente,
                    provinciaCliente: cliente.provinciaCliente,
                    telefonoCliente: cliente.telefonoCliente
                });
            },
            error => {
                console.error('Error al cargar el cliente:', error);
            }
        )
    }

    onSubmit() {
        if (this.CrearCliente.valid) {
            // El formulario es válido. ¡Aquí es donde ocurre la magia!
            console.log('Formulario válido. Datos del cliente:', this.CrearCliente.value);

            // Aquí deberías:
            this.clientesService.crearCliente(this.CrearCliente.value).subscribe(response => {
                console.log('Cliente creado con éxito:', response);
                return this.router.navigate(['/clientes']);
            }, error => {
                console.error('Error al crear el cliente:', error);
                // Mostrar mensaje de error al usuario
            });

            // 2. Opcional: Resetear el formulario después de un envío exitoso
            // this.CrearCliente.reset();

        } else {
            // El formulario no es válido.
            console.log('Formulario inválido. Por favor, revisa los campos con errores.');
            // Marca todos los controles como 'touched' para que se muestren todos los mensajes de error
            // Esto es útil si el usuario intenta enviar el formulario sin tocar todos los campos
            this.CrearCliente.markAllAsTouched();
        }
    }
}
