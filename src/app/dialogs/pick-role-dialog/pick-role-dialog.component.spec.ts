import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickRoleDialogComponent } from './pick-role-dialog.component';

describe('PickRoleDialogComponent', () => {
  let component: PickRoleDialogComponent;
  let fixture: ComponentFixture<PickRoleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickRoleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
