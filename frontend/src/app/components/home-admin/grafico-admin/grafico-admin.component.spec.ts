import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoAdminComponent } from './grafico-admin.component';

describe('GraficoAdminComponent', () => {
  let component: GraficoAdminComponent;
  let fixture: ComponentFixture<GraficoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
