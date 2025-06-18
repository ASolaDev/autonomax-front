import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['estaLogueado']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                { provide: AuthService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy }
            ]
        });

        guard = TestBed.inject(AuthGuard);
    });

    it('debería crearse correctamente', () => {
        expect(guard).toBeTruthy();
    });

    it('debería permitir la activación si el usuario está logueado', () => {
        authServiceSpy.estaLogueado.and.returnValue(true);

        const result = guard.canActivate();

        expect(result).toBeTrue();
        expect(authServiceSpy.estaLogueado).toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('debería bloquear la activación y redirigir a /login si el usuario no está logueado', () => {
        authServiceSpy.estaLogueado.and.returnValue(false);

        const result = guard.canActivate();

        expect(result).toBeFalse();
        expect(authServiceSpy.estaLogueado).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
});
