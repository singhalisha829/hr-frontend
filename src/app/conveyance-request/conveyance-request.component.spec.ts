import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveyanceRequestComponent } from './conveyance-request.component';

describe('ConveyanceRequestComponent', () => {
  let component: ConveyanceRequestComponent;
  let fixture: ComponentFixture<ConveyanceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveyanceRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConveyanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
