function showItemsInBasketTemplate(item, basketIndex){
    return `<div class = "addedDish" id="${item}">
                            <div>
                            <p>${itemAmounts[basketIndex]} X ${basketItem[basketIndex]}</p>
                            </div>
                            <div class= "priceAmount">
                            <div class= "amount">
                            <button onclick="decreaseAmount('${item}')">-</button>
                            <p id="${item}_${itemAmounts[basketIndex]}">${itemAmounts[basketIndex]}</p>
                            <button onclick="increaseAmount('${item}')">+</button>
                            </div>
                            <p>${basketItemPrice[basketIndex]}</p>
                            </div>
                            </div>`
}