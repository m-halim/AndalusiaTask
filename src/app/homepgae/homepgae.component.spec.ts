import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepgaeComponent } from './homepgae.component';

describe('HomepgaeComponent', () => {
  let component: HomepgaeComponent;
  let fixture: ComponentFixture<HomepgaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepgaeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepgaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
