import { Component,OnInit} from '@angular/core';
import { ApiProductService } from 'src/app/Service/api-product.service';
import { Product } from 'src/app/Interface/data-type';
import {faTrashCan,faFilePen} from "@fortawesome/free-solid-svg-icons"


@Component({
  selector: 'app-home-seller',
  templateUrl: './home-seller.component.html',
  styleUrls: ['./home-seller.component.css']
})
export class HomeSellerComponent implements OnInit{
   public productList:undefined | Product[];
   public deleteMessage:undefined | string;
   public deleteIcon=faTrashCan;
   public editIcon=faFilePen;
  constructor(private apiProductService:ApiProductService){}

  ngOnInit(): void {
    this.productItems()
  }

  productItems(){
    this.apiProductService.showProduct().subscribe(result=>{
      this.productList=result;
 })
  }

  deleteProduct(id:number){
    this.apiProductService.deleteProduct(id).subscribe(result=>{
        if(result){
          this.deleteMessage="Product deleted successfully"
          this.productItems();
        }
        setTimeout(() =>this.deleteMessage=undefined, 1000);
    })
    
  }

}
