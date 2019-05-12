/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ShopDetailComponent } from 'app/entities/shop/shop/shop-detail.component';
import { Shop } from 'app/shared/model/shop/shop.model';

describe('Component Tests', () => {
  describe('Shop Management Detail Component', () => {
    let comp: ShopDetailComponent;
    let fixture: ComponentFixture<ShopDetailComponent>;
    const route = ({ data: of({ shop: new Shop(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ShopDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ShopDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShopDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shop).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
