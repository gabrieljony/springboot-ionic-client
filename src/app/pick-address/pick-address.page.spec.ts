import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickAddressPage } from './pick-address.page';

describe('PickAddressPage', () => {
  let component: PickAddressPage;
  let fixture: ComponentFixture<PickAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
