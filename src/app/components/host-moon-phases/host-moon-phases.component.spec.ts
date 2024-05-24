import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostMoonPhasesComponent } from './host-moon-phases.component';

describe('HostMoonPhasesComponent', () => {
  let component: HostMoonPhasesComponent;
  let fixture: ComponentFixture<HostMoonPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostMoonPhasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostMoonPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
