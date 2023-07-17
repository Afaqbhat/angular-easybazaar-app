import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Interface/data-type';
import { ApiProductService } from 'src/app/Service/api-product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 public searchProducts: undefined | Product[]
  constructor(private route:ActivatedRoute, private apiProductService:ApiProductService){}

  ngOnInit(): void {
    let query=this.route.snapshot.paramMap.get('query');
    
    query && this.apiProductService.searchProducts(query).subscribe((data)=>{
        this.searchProducts = data;
        
  })

}
}
