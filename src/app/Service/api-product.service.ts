import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter} from '@angular/core';
import { Cart, Product, order } from '../Interface/data-type';


@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
    public CartProducts=new EventEmitter<Product[] | []>()
  constructor(private http:HttpClient) { }

  addProduct(data:Product){
    return this.http.post("http://localhost:3000/products",data)
       
  }

  showProduct(){
   return this.http.get<Product[]>("http://localhost:3000/products")
  }

  deleteProduct(id:number){
   return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProductById(id:string){
     return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(data:Product,id:string | null){
   return this.http.put(`http://localhost:3000/products/${id}`,data)
  }

  displayProducts(){
    return this.http.get<Product[]>("http://localhost:3000/products?_limit=3")
  }

  displayTrendingProducts(){
    return this.http.get<Product[]>("http://localhost:3000/products?_limit=8")
  }

  searchProducts(query:string){
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.CartProducts.emit([data]);
      
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.CartProducts.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.CartProducts.emit(items);
    }
  }

  addToCart(cartProduct:Cart){
   return this.http.post("http://localhost:3000/cart",cartProduct)
  }

  getCartProducts(id:number){
    return this.http.get<Product[]>("http://localhost:3000/cart?userId="+id,
    {observe:'response'}).subscribe(data=>{
      
      if(data && data.body){
        this.CartProducts.emit(data.body)

      }
    })
  }

  removeFromCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  getCurrentCartProducts(){
    let user=localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;
    return this.http.get<Cart[]>(`http://localhost:3000/cart?userId=${userId}`)

  }

  addOrderedProducts(data: order) {
    return this.http.post('http://localhost:3000/order', data);
  }

  getOrderedProducts(){
  let user=localStorage.getItem('user');
  let userId=user && JSON.parse(user).id;
  return this.http.get<order[]>(`http://localhost:3000/order?userId=${userId}`);
}

deleteCartItems(cartId?: number) {
  return this.http.delete(`http://localhost:3000/cart/${cartId}`).subscribe(() => {
    this.CartProducts.emit([]);
  })
}

cancelOrder(orderId?:number){
  return this.http.delete(`http://localhost:3000/order/${orderId}`)

}
}
