import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostContactComponent } from './host-contact.component';

describe('HostContactComponent', () => {
  let component: HostContactComponent;
  let fixture: ComponentFixture<HostContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
