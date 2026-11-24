const burgerRef = document.getElementById("burgersSandwich");
console.log(myDishes[0]["burger&Sandwich"].length);
let count=0;
let basketItem = [];
let basketItemPrice = [];
let itemAmounts = [];
burgerRef.innerHTML="";

function loadBurgerSandwich(){
    for(let index = 0 ; index< myDishes[0]["burger&Sandwich"].length; index++){
        let price = myDishes[0]["burger&Sandwich"][index].price;
        
        let priceNumber = parseFloat(price);
       
        let convertedPrice= price.toFixed(2).replace(".",",");
        let convertedPriceWithEuro= convertedPrice + "€";
        
        burgerRef.innerHTML += `<div class="subMenuWrapper">
                                    <div class= "subMenu">
                                    <div class="subMenuDesc">
                                    <h4>${myDishes[0]["burger&Sandwich"][index].name}</h4>
                                    <p>${myDishes[0]["burger&Sandwich"][index].description}</p>
                                    </div>
                                    <div class= "subMenuPrice">
                                    <h4>${convertedPriceWithEuro}</h4>
                                    <button class= "subMenuButton" id= "button_${index}" onclick="addToBasket(${index},'${myDishes[0]["burger&Sandwich"][index].name}',${priceNumber})">
                                    Add to basket</button>
                                    </div>  
                                </div>`
     

    }

}

function addToBasket(index,item,price){
    let menuItemIndex = basketItem.indexOf(item);
    if(menuItemIndex == -1){
        console.log("Item name", item);
        console.log("item Price", price);
        basketItem.push(item);
        basketItemPrice.push(price);
        itemAmounts.push(1);
        console.log (basketItem);

    }

    else{

        
        itemAmounts[menuItemIndex]++;
        let increasedPrice = itemAmounts[menuItemIndex]*price;
        console.log("increasedPrice", increasedPrice);
        basketItemPrice[menuItemIndex]= increasedPrice;
        console.log (basketItem);
        console.log("amount", basketItemPrice[menuItemIndex]);
        
    }

    const basketRef=document.getElementById("basketWithDish");
    basketRef.innerHTML = "";
    const emptyBasketRef= document.getElementById("emptyBasket");

    for(basketIndex = 0; basketIndex< basketItem.length; basketIndex++){

        basketRef.innerHTML+= `<div class = "addedDish" id="${item}">
                            <div>
                            <p>${itemAmounts[basketIndex]} X ${basketItem[basketIndex]}</p>
                            </div>
                            <div class= "priceAmount">
                            <div class= "amount">
                            <button onclick="decreaseAmount()">-</button>
                            <p id="${item}_${itemAmounts[basketIndex]}">${itemAmounts[basketIndex]}</p>
                            <button onclick="increaseAmount()">+</button>
                            </div>
                            <p>${basketItemPrice[basketIndex]}</p>
                            </div>
                            </div>`;

        


    }
}

   







/* 
function addToBasket(index){
    
    const basketRef=document.getElementById("basketWithDish");
    const emptyBasketRef= document.getElementById("emptyBasket");
    if(document.getElementById(`${myDishes[0]["burger&Sandwich"][index].name}`))
    {
        let numberOfDishes = myDishes[0]["burger&Sandwich"][index].name;
        console.log("numberdishes", numberOfDishes)
        let text = numberOfDishes.textContent;
         count = Number(text);
        count= count+1;
        basketRef.innerHTML.appendChild( `<div class = "addedDish" id="${myDishes[0]["burger&Sandwich"][index].name}">
                            <div>
                            <p>${count} X ${myDishes[0]["burger&Sandwich"][index].name}</p>
                            </div>
                            <div class= "priceAmount">
                            <div class= "amount">
                            <button onclick="decreaseAmount(${count},${index})">-</button>
                            <p id="${myDishes[0]["burger&Sandwich"][index].name}_${count}">${count}</p>
                            <button onclick="increaseAmount(${count},${index})">+</button>
                            </div>
                            <p>${myDishes[0]["burger&Sandwich"][index].price}</p>
                            </div>
                            </div>`);

        


    }

    else {
        count=1;

    basketRef.innerHTML+= `<div class = "addedDish" id="${myDishes[0]["burger&Sandwich"][index].name}">
                            <div>
                            <p>${count} X ${myDishes[0]["burger&Sandwich"][index].name}</p>
                            </div>
                            <div class= "priceAmount">
                            <div class= "amount">
                            <button onclick="decreaseAmount(${count},${index})">-</button>
                            <p id="${myDishes[0]["burger&Sandwich"][index].name}_${count}">${count}</p>
                            <button onclick="increaseAmount(${count},${index})">+</button>
                            </div>
                            <p>${myDishes[0]["burger&Sandwich"][index].price}</p>
                            </div>
                            </div>`;

    }



}


function decreaseAmount(count, index){
    
    const basketRef=document.getElementById("basketWithDish");

     if(document.getElementById(`${myDishes[0]["burger&Sandwich"][index].name}`))
    {
        let numberOfDishes = document.getElementById(`${myDishes[0]["burger&Sandwich"][index].name}_${count}`)
        let text = numberOfDishes.textContent;
         count = Number(text);
        count = count-1;
        basketRef.innerHTML = `<div class = "addedDish" id="${myDishes[0]["burger&Sandwich"][index].name}">
                            <div>
                            <p>${count} X ${myDishes[0]["burger&Sandwich"][index].name}</p>
                            </div>
                            <div class= "priceAmount">
                            <div class= "amount">
                            <button onclick="decreaseAmount(${count},${index})">-</button>
                            <p id="${myDishes[0]["burger&Sandwich"][index].name}_${count}">${count}</p>
                            <button onclick="increaseAmount(${count},${index})">+</button>
                            </div>
                            <p>${myDishes[0]["burger&Sandwich"][index].price}</p>
                            </div>
                            </div>`;
    }

    else {
        count=1;

    basketRef.innerHTML+= `<div class = "addedDish" id="${myDishes[0]["burger&Sandwich"][index].name}">
                            <div>
                            <p>${count} X ${myDishes[0]["burger&Sandwich"][index].name}</p>
                            </div>
                            <div class= "priceAmount">
                            <div class= "amount">
                            <button onclick="decreaseAmount(${count},${index})">-</button>
                            <p id="${myDishes[0]["burger&Sandwich"][index].name}_${count}">${count}</p>
                            <button onclick="increaseAmount(${count},${index})">+</button>
                            </div>
                            <p>${myDishes[0]["burger&Sandwich"][index].price}</p>
                            </div>
                            </div>`;

    }




}


function increaseAmount(count, index){
    
    const basketRef=document.getElementById("basketWithDish");
    if(document.getElementById(`${myDishes[0]["burger&Sandwich"][index].name}`))

    {
        let numberOfDishes = document.getElementById(`${myDishes[0]["burger&Sandwich"][index].name}_${count}`)
        let text = numberOfDishes.textContent;
         count = Number(text);
        count = count+1;
         basketRef.innerHTML = `<div class = "addedDish" id="${myDishes[0]["burger&Sandwich"][index].name}">
                            <div>
                            <p>${count} X ${myDishes[0]["burger&Sandwich"][index].name}</p>
                            </div>
                            <div class= "priceAmount">
                            <div class= "amount">
                            <button onclick="decreaseAmount(${count},${index})">-</button>
                            <p id="${myDishes[0]["burger&Sandwich"][index].name}_${count}">${count}</p>
                            <button onclick="increaseAmount(${count},${index})">+</button>
                            </div>
                            <p>${myDishes[0]["burger&Sandwich"][index].price}</p>
                            </div>
                            </div>`;
    }

    else {
        count=1;

    basketRef.innerHTML+= `<div class = "addedDish" id="${myDishes[0]["burger&Sandwich"][index].name}">
                            <div>
                            <p>${count} X ${myDishes[0]["burger&Sandwich"][index].name}</p>
                            </div>
                            <div class= "priceAmount">
                            <div class= "amount">
                            <button onclick="decreaseAmount(${count},${index})">-</button>
                            <p id="${myDishes[0]["burger&Sandwich"][index].name}_${count}">${count}</p>
                            <button onclick="increaseAmount(${count},${index})">+</button>
                            </div>
                            <p>${myDishes[0]["burger&Sandwich"][index].price}</p>
                            </div>
                            </div>`;

    }


} */