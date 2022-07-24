import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidercommandeComponent } from './validercommande.component';

describe('ValidercommandeComponent', () => {
  let component: ValidercommandeComponent;
  let fixture: ComponentFixture<ValidercommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidercommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidercommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
