import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorPanelComponent } from './lessor-panel.component';

describe('LessorPanelComponent', () => {
  let component: LessorPanelComponent;
  let fixture: ComponentFixture<LessorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessorPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
