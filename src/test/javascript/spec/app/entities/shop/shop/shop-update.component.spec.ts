/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ShopUpdateComponent } from 'app/entities/shop/shop/shop-update.component';
import { ShopService } from 'app/entities/shop/shop/shop.service';
import { Shop } from 'app/shared/model/shop/shop.model';

describe('Component Tests', () => {
  describe('Shop Management Update Component', () => {
    let comp: ShopUpdateComponent;
    let fixture: ComponentFixture<ShopUpdateComponent>;
    let service: ShopService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ShopUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ShopUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShopUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShopService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Shop(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Shop();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
