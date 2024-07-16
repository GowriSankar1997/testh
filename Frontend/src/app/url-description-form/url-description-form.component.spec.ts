import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlDescriptionFormComponent } from './url-description-form.component';

describe('UrlDescriptionFormComponent', () => {
  let component: UrlDescriptionFormComponent;
  let fixture: ComponentFixture<UrlDescriptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlDescriptionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlDescriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
