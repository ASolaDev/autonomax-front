import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
    });

    it("Debería estar creado", () => {
        expect(service).toBeTruthy();
    });
});
describe("AuthService", () => {
    let service: AuthService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: HttpClient, useValue: httpClientSpy }
            ]
        });
        service = TestBed.inject(AuthService);
        spyOn(sessionStorage, "getItem").and.callFake((key: string) => {
            return (sessionStorage as any)._data ? (sessionStorage as any)._data[key] : null;
        });
        spyOn(sessionStorage, "setItem").and.callFake((key: string, value: string) => {
            (sessionStorage as any)._data = (sessionStorage as any)._data || {};
            (sessionStorage as any)._data[key] = value;
        });
        spyOn(sessionStorage, "removeItem").and.callFake((key: string) => {
            if ((sessionStorage as any)._data) {
                delete (sessionStorage as any)._data[key];
            }
        });
    });

    it("Debería llamar a HttpClient.post en el login con los parámetros correctos", () => {
        const nombreUsuario = "test";
        const password = "pass";
        httpClientSpy.post.and.returnValue(of({}));
        service.login(nombreUsuario, password).subscribe();
        expect(httpClientSpy.post).toHaveBeenCalledWith(
            "http://localhost:8082/autonomax/login",
            { nombreUsuario, password },
            { withCredentials: true }
        );
    });

    it("Debería llamar a HttpClient.post al desloguear y eliminar usuarioActual del sessionStorage", (done) => {
        (sessionStorage as any)._data = { usuarioActual: "algo" };
        httpClientSpy.post.and.returnValue(of({}));
        service.logout().subscribe(() => {
            expect(httpClientSpy.post).toHaveBeenCalledWith(
                "http://localhost:8082/autonomax/logout",
                {},
                { withCredentials: true }
            );
            expect(sessionStorage.removeItem).toHaveBeenCalledWith("usuarioActual");
            done();
        });
    });

    it("Debería retornar true si usuarioActual existe", () => {
        (sessionStorage as any)._data = { usuarioActual: "algo" };
        expect(service.estaLogueado()).toBeTrue();
    });

    it("Debería retornar false si usuarioActual no existe", () => {
        (sessionStorage as any)._data = {};
        expect(service.estaLogueado()).toBeFalse();
    });
});
