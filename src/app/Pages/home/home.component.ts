import { Component,OnInit } from '@angular/core';
import { ApiProductService } from 'src/app/Service/api-product.service';
import { Product } from 'src/app/Interface/data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public displayProducts: undefined | Product[];
  public trendingProducts : undefined | Product[];
  constructor(private apiProductService:ApiProductService){}

  ngOnInit(): void {
    this.apiProductService.displayProducts().subscribe(data=>{
          this.displayProducts = data;
          
    })

    this.apiProductService.displayTrendingProducts().subscribe(data=>{
      this.trendingProducts= data;
    })
  }
}
