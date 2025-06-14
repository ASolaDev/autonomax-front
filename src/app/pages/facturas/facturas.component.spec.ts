import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasComponent } from './facturas.component';

describe('FacturasComponent', () => {
    let component: FacturasComponent;
    let fixture: ComponentFixture<FacturasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FacturasComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FacturasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
