import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuchadoresComponent } from './luchadores.component';

describe('LuchadoresComponent', () => {
  let component: LuchadoresComponent;
  let fixture: ComponentFixture<LuchadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LuchadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LuchadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
