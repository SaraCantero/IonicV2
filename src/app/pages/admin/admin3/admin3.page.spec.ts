import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Admin3Page } from './admin3.page';

describe('Admin3Page', () => {
  let component: Admin3Page;
  let fixture: ComponentFixture<Admin3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Admin3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
