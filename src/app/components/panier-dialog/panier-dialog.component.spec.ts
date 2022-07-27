import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierDialogComponent } from './panier-dialog.component';

describe('PanierDialogComponent', () => {
  let component: PanierDialogComponent;
  let fixture: ComponentFixture<PanierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
