import { Product } from "./product.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Filter } from "./configClasses.repository";

const productsUrl = "/api/products";

@Injectable()
export class Repository {
  product: Product;
  products: Product[];
  filter: Filter = new Filter();
    
  constructor(private http: HttpClient) {
    //this.getProducts(true);
    this.filter.category = "soccer";
    this.filter.related = true;
    this.getProducts();
  }

  getProduct(id: number) {
    this.http.get<Product>(`${productsUrl}/${id}`)
      .subscribe(p => {
        this.product = p;
        console.log("Product Data Recieved.");
      });
  }

  getProducts(related = false) {
    console.log("Product Data Requested.");
    //this.http.get<Product[]>(`${productsUrl}?related=${related}`)
    //  .subscribe(prods => {
    //    this.products = prods;
    //  });
    let url = `${productsUrl}?related=${this.filter.related}`;
    if (this.filter.category) {
      url += `&category=${this.filter.category}`;
    }
    if (this.filter.search) {
      url += `&search=${this.filter.search}`;
    }
    this.http.get<Product[]>(url).subscribe(prods => this.products = prods);
  }

}
