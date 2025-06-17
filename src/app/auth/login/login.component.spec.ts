import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['checkSession', 'login']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [LoginComponent],
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debería crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debería inicializar el formulario correctamente', () => {
        expect(component.loginForm).toBeDefined();
        expect(component.loginForm.controls['nombreUsuario']).toBeDefined();
        expect(component.loginForm.controls['password']).toBeDefined();
    });

    it('debería marcar todos los campos como tocados si el formulario es inválido al intentar iniciar sesión', () => {
        component.onLogin();
        expect(component.loginForm.controls['nombreUsuario'].touched).toBeTrue();
        expect(component.loginForm.controls['password'].touched).toBeTrue();
        expect(component.generalError).toBe('Por favor, rellena todos los campos correctamente.');
    });

    it('debería llamar a AuthService.login y navegar a /inicio si el inicio de sesión es exitoso', () => {
        const mockResponse = { token: 'mockToken' };
        authServiceSpy.login.and.returnValue(of(mockResponse));

        component.loginForm.setValue({ nombreUsuario: 'usuario', password: 'contraseña' });
        component.onLogin();

        expect(authServiceSpy.login).toHaveBeenCalledWith('usuario', 'contraseña');
        expect(sessionStorage.getItem('usuarioActual')).toBe(JSON.stringify(mockResponse));
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/inicio']);
        expect(component.isLoading).toBeFalse();
    });

    it('debería manejar errores de inicio de sesión correctamente', () => {
        const mockError = { error: 'Usuario no encontrado.', status: 404 } as HttpErrorResponse;
        authServiceSpy.login.and.returnValue(throwError(mockError));

        component.loginForm.setValue({ nombreUsuario: 'usuario', password: 'contraseña' });
        component.onLogin();

        expect(authServiceSpy.login).toHaveBeenCalledWith('usuario', 'contraseña');
        expect(component.generalError).toBe('Usuario no encontrado.');
        expect(component.isLoading).toBeFalse();
    });

    it('debería manejar errores inesperados correctamente', () => {
        const mockError = { status: 500 } as HttpErrorResponse;
        authServiceSpy.login.and.returnValue(throwError(mockError));

        component.loginForm.setValue({ nombreUsuario: 'usuario', password: 'contraseña' });
        component.onLogin();

        expect(authServiceSpy.login).toHaveBeenCalledWith('usuario', 'contraseña');
        expect(component.generalError).toBe('Ha ocurrido un error inesperado. Por favor, inténtalo más tarde.');
        expect(component.isLoading).toBeFalse();
    });

    it('debería redirigir a /inicio si hay sesión activa en el backend', () => {
        authServiceSpy.checkSession.and.returnValue(of(true));

        component.ngOnInit();

        expect(authServiceSpy.checkSession).toHaveBeenCalled();
        expect(sessionStorage.getItem('usuarioActual')).toBe('true');
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/inicio']);
    });

    it('debería limpiar la sesión si no hay sesión activa en el backend', () => {
        authServiceSpy.checkSession.and.returnValue(throwError({}));

        component.ngOnInit();

        expect(authServiceSpy.checkSession).toHaveBeenCalled();
        expect(sessionStorage.getItem('usuarioActual')).toBeNull();
    });
});
