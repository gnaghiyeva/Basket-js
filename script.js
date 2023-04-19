let cards = document.querySelectorAll(".card");
let addToCardButtons = [];
let  count = document.querySelector(".count");
let totalSpan = document.querySelector(".total");

cards.forEach((card)=>{

    // let productName = card.children[0].children[1].textContent;
    // let productPrice = card.children[0].children[3].children[0].textContent;
    // let productDesc = card.children[0].children[2].textContent;
    

    addToCardButtons.push(card.children[0].children[4])

});

//bos local storage
document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("product")){
        let basket = [];
        localStorage.setItem("product",JSON.stringify(basket));
    }
})


addToCardButtons.forEach((add)=>{
    add.addEventListener("click", (e)=>{
       let name = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
       let price = e.target.previousElementSibling.children[0].textContent;
       let desc = e.target.previousElementSibling.previousElementSibling.textContent;
       let id = e.target.parentElement.parentElement.getAttribute("data-id");
        
        let product={
        id: id,
        name:name,
        price:price,
        desc:desc,
        count:1
       }


       let basket =JSON.parse(localStorage.getItem("product")) || [];

       let existed = basket.find((basketItem)=>basketItem.id==id);

       if(existed){
        existed.count++;
       }
       else{
         basket.push(product)
       }


       count.textContent = basket.length;
       

       let total = basket.reduce((total,value)=>{
        let t = Number(value.price)*Number(value.count);
        return total+t;
       },0)

       console.log(total)
       totalSpan.textContent=total;
       localStorage.setItem("product",JSON.stringify(basket));
       console.log(basket)
    })
})


let BasketData = JSON.parse(localStorage.getItem("product"));

const basketItems=[
    {
        idBasket:localStorage.getItem(BasketData,"id"),
        nameBasket:localStorage.getItem(BasketData,"name"),
        priceBasket:localStorage.getItem(BasketData,"price"),
        descBasket:localStorage.getItem(BasketData,"desc"),
        countBasket:localStorage.getItem(BasketData,"count")
       
    }
]
console.log(basketItems)

const tableBody = document.querySelector("tbody");


basketItems.forEach(elem=>{
    let newRow = createRow(elem);
    tableBody.appendChild(newRow);
})

function createRow({id,name,desc,price,count}){
    let row = document.createElement("tr");

    let idBasket = document.createElement("td");
    idBasket.textContent=localStorage.getItem("product",id);
    console.log(idBasket)

    let nameBasket = document.createElement("td");
    nameBasket.textContent=localStorage.getItem("product",name);
    console.log(nameBasket)
    

    let descBasket = document.createElement("td");
    descBasket.textContent=localStorage.getItem("product",desc);

    let priceBasket = document.createElement("td");
    priceBasket.textContent=localStorage.getItem("product",price);

    let countBasket = document.createElement("td");
    countBasket.textContent=localStorage.getItem("product",count);




    row.append(idBasket,nameBasket,descBasket,priceBasket,countBasket);

    return row;
}
