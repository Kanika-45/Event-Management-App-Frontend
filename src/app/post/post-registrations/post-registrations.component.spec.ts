import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRegistrationsComponent } from './post-registrations.component';

describe('PostRegistrationsComponent', () => {
  let component: PostRegistrationsComponent;
  let fixture: ComponentFixture<PostRegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRegistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
