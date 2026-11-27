function showItemsInBasketTemplate(basketIndex){
    const item = basketItem[basketIndex];
    return `<div class = "addedDish" id="${item}">
                            <div>
                            <p>${itemAmounts[basketIndex]} X ${basketItem[basketIndex]}</p>
                            </div>
                            <div class= "priceAmount">
                            <div class= "amount">
                            <button type="button" onclick="decreaseAmount('${item}')">
                                ${itemAmounts[basketIndex] === 1 ? '<img src="./assets/img/delete.svg" alt="">' : "-"}
                            </button>
                            <p id="${item}_${itemAmounts[basketIndex]}">${itemAmounts[basketIndex]}</p>
                            <button onclick="increaseAmount('${item}')">+</button>
                            </div>
                            <p>${basketItemPrice[basketIndex]}€</p>
                            </div>
                            </div>
                            </div>`
}