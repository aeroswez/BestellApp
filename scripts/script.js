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
        
        price = Number(price).toFixed(2);
       
        let convertedPrice= price.replace(".",",");
        let convertedPriceWithEuro= convertedPrice + "€";
        
        burgerRef.innerHTML += `<div class="subMenuWrapper">
                                    <div class= "subMenu">
                                    <div class="subMenuDesc">
                                    <h4>${myDishes[0]["burger&Sandwich"][index].name}</h4>
                                    <p>${myDishes[0]["burger&Sandwich"][index].description}</p>
                                    </div>
                                    <div class= "subMenuPrice">
                                    <h4>${convertedPriceWithEuro}</h4>
                                    <button class= "subMenuButton" id= "button_${index}" onclick="addToBasket(${index},'${myDishes[0]["burger&Sandwich"][index].name}',${price})">
                                    Add to basket</button>
                                    </div>  
                                </div>`
     

    }

}

function addToBasket(index,item,price){
    let emptyBasketRef = document.getElementById("emptyBasket");
    emptyBasketRef.style.display = "none";
    price= parseFloat(price).toFixed(2);
    let menuItemIndex = basketItem.indexOf(item);
    if(menuItemIndex == -1){
   
        basketItem.push(item);
        basketItemPrice.push(price);
        itemAmounts.push(1);
        

    }

    else{

        
        itemAmounts[menuItemIndex]++;
        let increasedPrice = parseFloat(itemAmounts[menuItemIndex]*price).toFixed(2);
        basketItemPrice[menuItemIndex]= increasedPrice;
        
    }

    renderItemsInBasket(item);

    
}

function renderItemsInBasket(item){

    const basketRef=document.getElementById("basketWithDish");
    basketRef.innerHTML = "";
    const emptyBasketRef= document.getElementById("emptyBasket");

    for(basketIndex = 0; basketIndex< basketItem.length; basketIndex++){

        basketRef.innerHTML+= showItemsInBasketTemplate(item, basketIndex);

    }

}

   
function decreaseAmount(item){
    let emptyBasketRef = document.getElementById("emptyBasket");
    let menuItemIndex = basketItem.indexOf(item);
    let amountOfItem = itemAmounts[menuItemIndex];
    let price = basketItemPrice[menuItemIndex]/amountOfItem;
    let decreasedAmount = amountOfItem - 1;

   
    if(decreasedAmount >= 1){
    let decreasedPrice = parseFloat(decreasedAmount*price).toFixed(2);
    itemAmounts[menuItemIndex]= decreasedAmount;
    basketItemPrice[menuItemIndex]= decreasedPrice;
    renderItemsInBasket(item);

    }
    else if(decreasedAmount == 0){
        basketItem.splice(menuItemIndex, 1)
        console.log(basketItem);
        renderItemsInBasket(item);

        
    }
    

}

function increaseAmount(item){

    let menuItemIndex = basketItem.indexOf(item);
    let amountOfItem = itemAmounts[menuItemIndex];
    let price = basketItemPrice[menuItemIndex]/amountOfItem;
    let increasedAmount = amountOfItem + 1;
    let increasedPrice = parseFloat(increasedAmount*price).toFixed(2);
    
   
    if(increasedAmount >= 0){
    itemAmounts[menuItemIndex]= increasedAmount;
    basketItemPrice[menuItemIndex]= increasedPrice;

    renderItemsInBasket(item);
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