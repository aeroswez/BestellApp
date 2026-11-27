const burgerRef = document.getElementById("burgersSandwich");
const pizzaRef = document.getElementById("pizza");
const saladRef = document.getElementById("salad");
console.log(myDishes[0]["burger&Sandwich"].length);
let count=0;

let dishNames = myDishes.map(obj => Object.keys(obj)[0]);
let basketItem = [];
let basketItemPrice = [];
let itemAmounts = [];
burgerRef.innerHTML="";

function loadBurgerSandwich(){
    for(let index = 0 ; index< dishNames.length; index++){
        const categoryKey = dishNames[index];
        for(let j = 0; j < myDishes[index][categoryKey].length ; j++){
        
        let price = myDishes[index][categoryKey][j].price;
        
        price = Number(price).toFixed(2);
       
        let convertedPrice= price.replace(".",",");
        let convertedPriceWithEuro= convertedPrice + "€";

        if(dishNames[index]=="burger&Sandwich") {

        burgerRef.innerHTML += `<div class="subMenuWrapper">
                                    <div class= "subMenu">
                                    <div class="subMenuDesc">
                                    <h4>${myDishes[index][categoryKey][j].name}</h4>
                                    <p>${myDishes[index][categoryKey][j].description}</p>
                                    </div>
                                    <div class= "subMenuPrice">
                                    <h4>${convertedPriceWithEuro}</h4>
                                    <button class= "subMenuButton" id= "button_${index}_${j}" onclick="addToBasket(${index},${j})">
                                    Add to basket</button>
                                    </div>  
                                </div>`
     

    }

    else if (dishNames[index]=="Pizza (30cm)") {

         pizzaRef.innerHTML += `<div class="subMenuWrapper">
                                    <div class= "subMenu">
                                    <div class="subMenuDesc">
                                    <h4>${myDishes[index][categoryKey][j].name}</h4>
                                    <p>${myDishes[index][categoryKey][j].description}</p>
                                    </div>
                                    <div class= "subMenuPrice">
                                    <h4>${convertedPriceWithEuro}</h4>
                                    <button class= "subMenuButton" id= "button_${index}_${j}" onclick="addToBasket(${index},${j})">
                                    Add to basket</button>
                                    </div>  
                                </div>`
     

    }

    else if (dishNames[index]=="Salad"){

         saladRef.innerHTML += `<div class="subMenuWrapper">
                                    <div class= "subMenu">
                                    <div class="subMenuDesc">
                                    <h4>${myDishes[index][categoryKey][j].name}</h4>
                                    <p>${myDishes[index][categoryKey][j].description}</p>
                                    </div>
                                    <div class= "subMenuPrice">
                                    <h4>${convertedPriceWithEuro}</h4>
                                    <button class= "subMenuButton" id= "button_${index}_${j}" onclick="addToBasket(${index},${j})">
                                    Add to basket</button>
                                    </div>  
                                </div>`
     

    }
}

}
}

function addToBasket(categoryIndex,itemIndex){
    let emptyBasketRef = document.getElementById("emptyBasket");
    emptyBasketRef.style.display = "none";
    const categoryKey = dishNames[categoryIndex];
    const dish = myDishes[categoryIndex][categoryKey][itemIndex];
    const item = dish.name;
    const price = parseFloat(dish.price).toFixed(2);
    let menuItemIndex = basketItem.indexOf(item);
    if(menuItemIndex == -1){
   
        basketItem.push(item);
        basketItemPrice.push(price);
        itemAmounts.push(1);
        menuItemIndex = basketItem.length - 1;

    }

    else{
 
        itemAmounts[menuItemIndex]++;
        let increasedPrice = parseFloat(itemAmounts[menuItemIndex]*price).toFixed(2);
        basketItemPrice[menuItemIndex]= increasedPrice;
        
    }

    updateAddToBasketButton(item, itemAmounts[menuItemIndex]);
    renderItemsInBasket();
}

function updateAddToBasketButton(item, amount){
    for(let categoryIndex = 0; categoryIndex < myDishes.length; categoryIndex++){
        const categoryKey = dishNames[categoryIndex];
        const itemIndex = myDishes[categoryIndex][categoryKey].findIndex(dish => dish.name === item);
        if(itemIndex !== -1){
            const buttonRef = document.getElementById(`button_${categoryIndex}_${itemIndex}`);
            if(buttonRef){
                buttonRef.textContent = amount > 0 ? `Added (${amount})` : "Add to basket";
            }
            return;
        }
    }
}



function renderItemsInBasket(){

    const basketRef=document.getElementById("basketWithDish");
    let basketItems = "";
    const emptyBasketRef= document.getElementById("emptyBasket");
    emptyBasketRef.style.display = basketItem.length === 0 ? "" : "none";
    let basketSum = 0;
    const deliveryFee = 4.99;

    for(let basketIndex = 0; basketIndex< basketItem.length; basketIndex++){
        basketSum +=parseFloat(basketItemPrice[basketIndex]);
        basketItems += showItemsInBasketTemplate(basketIndex);
    }

    let totalPrice = parseFloat(basketSum) + parseFloat(deliveryFee);
   

    basketRef.innerHTML = `<div class="basketHeading"><p>Your Basket</p></div>
                            <div class="basketItems">${basketItems}</div>
                            <div class="totalPrice">
                            <div class = "sumPrice">
                            <div class = "subTotal">
                            <p> Subtotal</p><p>${parseFloat(basketSum.toFixed(2))}€</p></div>
                            <div class= "shipping"><p>Delivery fee </p>
                            <p>${deliveryFee}€</p></div> <hr>
                            <div class = "total"><p>Total</p>
                            <p>${parseFloat(totalPrice.toFixed(2))}€</p></div>
                            <button class= "buyNow" onclick= "renderOrderConfirmation()">Buy Now (${parseFloat(totalPrice.toFixed(2))}€)</button></div></div>`;

}

function decreaseAmount(item){
    let menuItemIndex = basketItem.indexOf(item);
    if(menuItemIndex === -1) return;

    let amountOfItem = itemAmounts[menuItemIndex];
    let price = basketItemPrice[menuItemIndex]/amountOfItem;
    let decreasedAmount = amountOfItem - 1;

   
    if(decreasedAmount >= 1){
    let decreasedPrice = parseFloat(decreasedAmount*price).toFixed(2);
    itemAmounts[menuItemIndex]= decreasedAmount;
    basketItemPrice[menuItemIndex]= decreasedPrice;
    updateAddToBasketButton(item, decreasedAmount);
    renderItemsInBasket();

    }
    else if(decreasedAmount == 0){
        basketItem.splice(menuItemIndex, 1);
        basketItemPrice.splice(menuItemIndex, 1);
        itemAmounts.splice(menuItemIndex, 1);
        updateAddToBasketButton(item, 0);
        renderItemsInBasket();

        
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

    updateAddToBasketButton(item, increasedAmount);
    renderItemsInBasket();
    }

}

function renderOrderConfirmation(){
    let dialogRef = document.getElementById("dialogContainer");
    dialogRef.innerHTML = `<dialog id="showConfirmation" class= "confimrationDialog">
                            <header><img src= "./assets/img/delivery.png">
                            </header>
                            <section><p>Order confirmed!</p>
                            <p>Your food is on the way!</p></section></dialog>`;
    
    const dialogElement = document.getElementById("showConfirmation");
    dialogElement.showModal();
    setTimeout(() => {
  if (dialogElement.open) dialogElement.close();
}, 3000);
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