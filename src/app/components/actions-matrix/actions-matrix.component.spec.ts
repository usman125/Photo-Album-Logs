import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsMatrixComponent } from './actions-matrix.component';

describe('ActionsMatrixComponent', () => {
  let component: ActionsMatrixComponent;
  let fixture: ComponentFixture<ActionsMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
