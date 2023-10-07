import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattelsComponent } from './chattels.component';

describe('ChattelsComponent', () => {
  let component: ChattelsComponent;
  let fixture: ComponentFixture<ChattelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChattelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChattelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
