export interface SignUp{
    firstname:string,
    lastname:string
    password:string | number,
    email:string
}

export interface Login{
    email:string;
    password:string | number;
}

export interface Product{
    name:string,
    price:number,
    category:string,
    description:string,
    image:string,
    id:number,
    quantity?:number,
    productId?:number
}

export interface Cart{
    name:string,
    price:number,
    category:string,
    description:string,
    image:string,
    id?:number,
    quantity?:number,
    userId:number,
    productId:number
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
  }

  export interface order {
    email:string,
    address:string,
    contact:number,
    totalPrice?:number,
    userId?:string,
    id?:number
  }