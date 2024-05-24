import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonPhaseComponent } from './moon-phase.component';

describe('MoonPhaseComponent', () => {
  let component: MoonPhaseComponent;
  let fixture: ComponentFixture<MoonPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonPhaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoonPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
