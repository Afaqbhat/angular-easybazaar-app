import { Component } from '@angular/core';
import { Product } from 'src/app/Interface/data-type';
import { ApiProductService } from 'src/app/Service/api-product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  public successMessage:string|undefined;
  constructor(private apiProductService:ApiProductService){}

  onSubmit(data:Product){
    this.apiProductService.addProduct(data).subscribe(result=>{
      if(result){
        this.successMessage="Product successfully added"
      }
      setTimeout(()=>this.successMessage=undefined,1000);
      
    })
 
  }
}
