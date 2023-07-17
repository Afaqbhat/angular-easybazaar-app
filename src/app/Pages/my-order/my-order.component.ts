import { Component,OnInit } from '@angular/core';
import { order } from 'src/app/Interface/data-type';
import { ApiProductService } from 'src/app/Service/api-product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
public orderedProducts:order[] | undefined
  constructor(private apiProductService:ApiProductService){}

  ngOnInit(): void {
       this.getOrderedProducts();
  }

  getOrderedProducts(){
    this.apiProductService.getOrderedProducts().subscribe(data=>{
         this.orderedProducts=data;
    })
  }

  cancelOrder(orderId?:number){
         this.apiProductService.cancelOrder(orderId).subscribe(()=>{
          this.getOrderedProducts();
         })
  }

}
