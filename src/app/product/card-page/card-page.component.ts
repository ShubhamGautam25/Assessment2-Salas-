import { Component,OnInit, ViewChild, TemplateRef } from "@angular/core";

  import {
    FormBuilder,
    FormGroup,
    Validators
  } from "@angular/forms";
  import { CommonService } from 'src/app/shared/services/common.service';
  export interface cardData {
      name: string;
      price: number;
      category: string;
      description:string;
      image: string;
      quantity:number;
      subtotal:number;
  }
import { MatDialog } from "@angular/material";

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit {
    ProductCardForm : FormGroup;
    Vat : number = 10;
    Discount : number = 10; 
    CardList:cardData[] =[];
   message:any;
   subscription:any;
   
  @ViewChild("myDialog", { static: true }) myDialog: TemplateRef<any>;
    constructor(
      private formBuilder: FormBuilder,
      private commonApi : CommonService,  
      public dialog: MatDialog
    ) { }
  
    ngOnInit() {
      this.subscription = this.commonApi.currentMessage.subscribe(message => {
        this.message = message;
        if(this.message != null){
        this.AddProductInCard();
        }
      });
      console.log("message",this.subscription);
      this.reset_form();
    }
   ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    reset_form(){
      this.ProductCardForm = this.formBuilder.group({
        quantity: [1],
        sub_total: [null],
        vat: [null],
        discount: [null],
        total: [null],
      });
    }
  
    AddProductInCard(){
      if(this.CardList.length>0){
      let count :number = 0;
      for(let i=0; i<this.CardList.length; i++){
        if(this.message.name == this.CardList[i].name){
          count++;
          this.CardList[i].quantity = this.CardList[i].quantity + 1;
          this.CardList[i].subtotal = (this.CardList[i].subtotal * this.CardList[i].quantity) ;
          break;
        }
      }
  if(count == 0){
    this.saveProduct();
  }
      }else {
        this.saveProduct();
    }
    }
     
    saveProduct(){
      let obj = { 
        name: this.message.name,
        price: Number(this.message.price),
        category: this.message.category,
        description:this.message.description,
        image: this.message.image,
        quantity:1,
        subtotal:Number(this.message.price)
      }
      this.CardList.push(obj);
    }
  

    ProcessSales(){
    this.dialog.open(this.myDialog);
    }

 
  
  
  
  
  
    IncreaseQuantity(index){
      this.CardList[index].quantity = this.CardList[index].quantity+1;
      this.CardList[index].subtotal = this.CardList[index].price*this.CardList[index].quantity;
      this.ProductCardForm.controls['quantity'].setValue(this.CardList[index].quantity + 1);
    }
    DecreaseQunatity(index){
      this.CardList[index].quantity = this.CardList[index].quantity-1;
      this.CardList[index].subtotal = this.CardList[index].price*this.CardList[index].quantity;
      this.ProductCardForm.controls['quantity'].setValue(this.CardList[index].quantity - 1);
      if(this.CardList[index].quantity == 0){
  if (index > -1) {
    this.CardList.splice(index, 1);
  }
      }
    }
    RemoveProduct(index){
      this.CardList.splice(index, 1);
      this.ProductCardForm.controls['quantity'].setValue(0);
    }
  
    getCardSubTotal(){
      var numbers = this.CardList.map(i => i.subtotal);
      var sum = numbers.reduce((a, b) => a + b, 0);
      return sum;
    }
    
    calculateVat(){
      let subtotal :number = this.getCardSubTotal();
      let vat = (subtotal /100)*this.Vat;
      return vat;
    }
    calculatedDiscount(){
      let subtotal :number = this.getCardSubTotal();
      let discount = (subtotal /100)*this.Discount;
      return discount;
    }
  
    calcualateGrandTotal(){
      let subtotal :number = this.getCardSubTotal();
      let vat :number = this.calculateVat();
      let discount :number = this.calculatedDiscount();
      let grandToral :number = 0;
      if(vat>discount){
        grandToral = subtotal + vat- discount;
      }else {
        grandToral = subtotal + discount-vat;
      }
      return grandToral;
    }
  }
  


  