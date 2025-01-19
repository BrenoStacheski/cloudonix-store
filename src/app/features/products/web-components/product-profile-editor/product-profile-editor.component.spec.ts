import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProfileEditorComponent } from './product-profile-editor.component';

describe('ProductProfileEditorComponent', () => {
  let component: ProductProfileEditorComponent;
  let fixture: ComponentFixture<ProductProfileEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductProfileEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductProfileEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
