import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessorComponent } from './add-lessor.component';

describe('AddLessorComponent', () => {
  let component: AddLessorComponent;
  let fixture: ComponentFixture<AddLessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
