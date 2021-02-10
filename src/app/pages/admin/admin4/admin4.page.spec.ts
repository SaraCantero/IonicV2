import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Admin4Page } from './admin4.page';

describe('Admin4Page', () => {
  let component: Admin4Page;
  let fixture: ComponentFixture<Admin4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Admin4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
