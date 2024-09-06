import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOverrideDialogComponent } from './price-override-dialog.component';

describe('PriceOverrideDialogComponent', () => {
  let component: PriceOverrideDialogComponent;
  let fixture: ComponentFixture<PriceOverrideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceOverrideDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceOverrideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
