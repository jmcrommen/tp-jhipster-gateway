import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IShop, Shop } from 'app/shared/model/shop/shop.model';
import { ShopService } from './shop.service';

@Component({
  selector: 'jhi-shop-update',
  templateUrl: './shop-update.component.html'
})
export class ShopUpdateComponent implements OnInit {
  shop: IShop;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    address: [],
    mail: []
  });

  constructor(protected shopService: ShopService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ shop }) => {
      this.updateForm(shop);
      this.shop = shop;
    });
  }

  updateForm(shop: IShop) {
    this.editForm.patchValue({
      id: shop.id,
      name: shop.name,
      description: shop.description,
      address: shop.address,
      mail: shop.mail
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const shop = this.createFromForm();
    if (shop.id !== undefined) {
      this.subscribeToSaveResponse(this.shopService.update(shop));
    } else {
      this.subscribeToSaveResponse(this.shopService.create(shop));
    }
  }

  private createFromForm(): IShop {
    const entity = {
      ...new Shop(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      address: this.editForm.get(['address']).value,
      mail: this.editForm.get(['mail']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShop>>) {
    result.subscribe((res: HttpResponse<IShop>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
