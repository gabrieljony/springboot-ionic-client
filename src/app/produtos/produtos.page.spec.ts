import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProdutosPage } from './produtos.page';

describe('ProdutosPage', () => {
  let component: ProdutosPage;
  let fixture: ComponentFixture<ProdutosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
