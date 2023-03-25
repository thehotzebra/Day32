import { Component, Input, OnInit, Output, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { Cart, Item } from '../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {

  @Input()
  cart123!: Cart
  
  @Output()
  formSubmitted = new Subject<boolean>();

  form!: FormGroup
  cartArray!: FormArray
  totalPrice!: number

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {

    if(this.cartArray !==undefined) this.cartArray.clear();

    this.cart123?.items.forEach(x => this.addFormItem(x))

  } 
  ngOnInit(): void {
    this.cartArray = this.fb.array([])
    this.form = this.createForm()
    console.log(this.cart123.items.length)
  }

  private createForm(): FormGroup {
    const grp = this.fb.group({
      name: this.fb.control<string>("", [ Validators.required ]),
      address: this.fb.control<string>("", [ Validators.required ]),
      delivery: this.fb.control<string>("", [ Validators.required, Validators.pattern("^[P|A]M$") ]),
      items: this.cartArray
    })

    return grp;
  }

  addFormItem(item: Item) {

    const grp = this.fb.group({
      name: this.fb.control<string>(item.name, [Validators.required]),
      price: this.fb.control<number>(item.price, [Validators.required]),
      quantity: this.fb.control<number>(item.quantity, [Validators.required]),
      total: this.fb.control<number>(item.quantity * item.price , [Validators.required])
    
    })
    this.cartArray.push(grp)
  }

  processForm() {
    this.formSubmitted.next(true)
    console.log(this.cart123.id)
    this.form.reset()
  }
}
