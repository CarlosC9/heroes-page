import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHeroDialogComponent } from './delete-hero-dialog.component';

describe('DeleteHeroDialogComponent', () => {
  let component: DeleteHeroDialogComponent;
  let fixture: ComponentFixture<DeleteHeroDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeleteHeroDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
