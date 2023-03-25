import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Item } from '../models';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{

@Input()
item: Item[] = [];

@Output()
onAddItem = new Subject<Item>();

form!: FormGroup;

constructor(private fb: FormBuilder) {}

ngOnInit(): void {
  this.form = this.fb.group({
    name: this.fb.control<string>("", [Validators.required]),
    price: this.fb.control<number>(0, [Validators.required]),
    quantity: this.fb.control<number>(1)
  })

}

onSelectItem(idx: number) {
  this.setFormValue(this.item[idx])
}

private setFormValue(item: Item) {
  this.form.setValue ({
  name: item.name,
  price: item.price,
  quantity:1
})
}

processForm() {
  this.onAddItem.next(this.form.getRawValue());
}
}