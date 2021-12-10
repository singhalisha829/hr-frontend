import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyBannerComponent } from './buddy-banner.component';

describe('BuddyBannerComponent', () => {
  let component: BuddyBannerComponent;
  let fixture: ComponentFixture<BuddyBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuddyBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddyBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
