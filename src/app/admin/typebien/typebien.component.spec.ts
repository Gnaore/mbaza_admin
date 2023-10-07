import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypebienComponent } from './typebien.component';

describe('TypebienComponent', () => {
  let component: TypebienComponent;
  let fixture: ComponentFixture<TypebienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypebienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypebienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
