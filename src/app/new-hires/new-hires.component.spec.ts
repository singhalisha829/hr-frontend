import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHiresComponent } from './new-hires.component';

describe('NewHiresComponent', () => {
  let component: NewHiresComponent;
  let fixture: ComponentFixture<NewHiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHiresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
