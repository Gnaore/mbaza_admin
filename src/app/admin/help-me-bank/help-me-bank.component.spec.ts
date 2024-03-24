import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpMeBankComponent } from './help-me-bank.component';

describe('HelpMeBankComponent', () => {
  let component: HelpMeBankComponent;
  let fixture: ComponentFixture<HelpMeBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpMeBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpMeBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
