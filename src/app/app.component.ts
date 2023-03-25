import { Component, Input} from '@angular/core';
import { Cart, Item } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fruit_cart_v3';

  cart!: Cart

  @Input()
  formSubmitted!: boolean;

  inventoryItem: Item[] = [
  {id: 1, name: 'apple', quantity: 1, price: 0.9},
  {id: 2, name: 'blueberries', quantity:1, price: 1.1},
  {id: 3, name: 'celery', quantity:1, price: 1.3}
]

addtoCart(item: Item) {

  if(this.cart === undefined) {
    this.cart = {
    id: this.generateId(),
    name:"",
    address:"",
    delivery:"",
    items: [item]
    }
  } else {

    let idx = this.cart.items.findIndex(x => x.name === item.name);
      // console.log(item.name);
      // console.log("idx", idx);
      if (idx === -1) {
        this.cart.items.push(item);
        // console.log("push >>> ", item);
      } else {
        // console.log("add quantity >>> ", item);
        this.cart.items[idx].quantity += item.quantity;
      }
    
}
this.cart = {... this.cart};
console.info(this.cart)
}

private generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

formSubmission(formSubmitted: boolean) {

  this.formSubmitted = true;
console.log(">>>formSubmitted: " + formSubmitted)

} 
}