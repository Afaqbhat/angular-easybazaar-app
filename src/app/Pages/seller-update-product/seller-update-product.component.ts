import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Interface/data-type';
import { ApiProductService } from 'src/app/Service/api-product.service';


@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
public productData:undefined | Product
public productId!:string | null;
public updateMessage:string | undefined

  constructor(private route:ActivatedRoute,private apiProductService:ApiProductService,
    private router:Router){}
  ngOnInit(): void {
    this.productId=this.route.snapshot.paramMap.get('id');
   this.productId && this.apiProductService.getProductById(this.productId).subscribe(data=>{
           this.productData=data;
   })

  }

  onSubmit(product:Product){
    this.apiProductService.updateProduct(product,this.productId).subscribe(result=>{
       if(result){
        this.updateMessage="Product Successfully updated";
        setTimeout(() => {
          this.updateMessage=undefined;
          this.router.navigate(['homeSeller']);
        }, 1000);
        

       }
    })
    
  }
}
