import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportacionComponent } from './exportacion.component';

describe('ExportacionComponent', () => {
  let component: ExportacionComponent;
  let fixture: ComponentFixture<ExportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
