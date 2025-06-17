import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginRequest } from '../models/loginRequest';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    const mockUrlBase = "http://localhost:8082/autonomax";

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('debería crearse correctamente', () => {
        expect(service).toBeTruthy();
    });

    it('debería realizar una solicitud POST al iniciar sesión', () => {
        const mockLoginRequest: LoginRequest = { nombreUsuario: 'usuario', password: 'contraseña' };
        const mockResponse = { token: 'mockToken' };

        service.login(mockLoginRequest.nombreUsuario, mockLoginRequest.password).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${mockUrlBase}/login`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockLoginRequest);
        req.flush(mockResponse);
    });

    it('debería manejar errores al iniciar sesión', () => {
        const mockLoginRequest: LoginRequest = { nombreUsuario: 'usuario', password: 'contraseña' };

        service.login(mockLoginRequest.nombreUsuario, mockLoginRequest.password).subscribe({
            error: (error) => {
                expect(error.status).toBe(401);
            }
        });

        const req = httpMock.expectOne(`${mockUrlBase}/login`);
        req.flush({ message: 'Credenciales inválidas' }, { status: 401, statusText: 'Unauthorized' });
    });

    it('debería realizar una solicitud POST al cerrar sesión', () => {
        service.logout().subscribe(() => {
            expect(sessionStorage.getItem("usuarioActual")).toBeNull();
        });

        const req = httpMock.expectOne(`${mockUrlBase}/logout`);
        expect(req.request.method).toBe('POST');
        req.flush({});
    });

    it('debería verificar si el usuario está logueado', () => {
        sessionStorage.setItem("usuarioActual", "true");
        expect(service.estaLogueado()).toBeTrue();

        sessionStorage.removeItem("usuarioActual");
        expect(service.estaLogueado()).toBeFalse();
    });

    it('debería realizar una solicitud GET para verificar la sesión activa', () => {
        service.checkSession().subscribe(() => {
            expect(sessionStorage.getItem("usuarioActual")).toBe("true");
        });

        const req = httpMock.expectOne(`${mockUrlBase}/check-session`);
        expect(req.request.method).toBe('GET');
        req.flush({});
    });

    it('debería manejar errores al verificar la sesión activa', () => {
        service.checkSession().subscribe({
            error: (error) => {
                expect(error.message).toBe("Sesión inválida");
                expect(sessionStorage.getItem("usuarioActual")).toBeNull();
            }
        });

        const req = httpMock.expectOne(`${mockUrlBase}/check-session`);
        req.flush({}, { status: 401, statusText: 'Unauthorized' });
    });
});
