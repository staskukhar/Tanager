import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithGoogleComponent } from './sign-in-with-google.component';

describe('SignInWithGoogleComponent', () => {
  let component: SignInWithGoogleComponent;
  let fixture: ComponentFixture<SignInWithGoogleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInWithGoogleComponent]
    });
    fixture = TestBed.createComponent(SignInWithGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
