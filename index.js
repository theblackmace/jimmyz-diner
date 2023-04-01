import { menuArray } from './data.js'
import { orderArray } from './data.js'

const itemsSection = document.getElementById('items')
const orderListSection = document.getElementById('order__list')
const modalSection = document.getElementById('modal')
const thanksSection = document.getElementById('thanks')
const totalPrice = document.getElementById('total__price')
const orderBtn = document.getElementById('order-btn')
const paymentForm = document.getElementById('payment-form')
const customerNameInput = document.getElementById('customer-name')
const closeModalBtn = document.getElementById('close-modal-btn')
const renderName = document.getElementById('render-name')
const orderRemove = document.getElementsByClassName("order__remove")

closeModalBtn.addEventListener('click', function() {
    modalSection.style.display = 'none'
})


paymentForm.addEventListener('submit', function(e) {
    const customerName = customerNameInput.value 
    e.preventDefault()
    modalSection.style.display = 'none'
    itemsSection.style.display = 'none'
    orderBtn.style.display = 'none'
    thanksSection.style.display = 'flex'
    renderName.innerText = customerName
    for (let i = 0; i<orderRemove.length; i++) {
        orderRemove[i].classList.add('hidden')
    }
    for (let item of orderArray) {
        if (item.quantity === 0) {
            console.log(`${item.name} was not ordered`)
        }
    }
    //console.log(orderArray)
})

let itemsContent = ``
let orderListContent = ``

function collectItemsHTML() {
    menuArray.forEach(function(item) {
        itemsContent += `
            <div class="item">
              <div class="item__img">
                <img id="item__img" src="${item.image}" alt="" />
              </div>
              <div class="item__details">
                <div class="item__name" id="item__name">${item.name}</div>
                <div class="item__ingredients" id="item__ingredients">${item.ingredients.join(', ')}</div>
                <div class="item__price" id="item__price"><span class="dollar">$</span>${item.price}</div>
              </div>
              <div class="item__add">
                <button class="add-btn" id="${item.id}" data-${item.name.toLowerCase()}="${item.id}">+</button>
              </div>
            </div>
        `
    })
    return itemsContent
}

function collectOrderListHTML() {
    menuArray.forEach(function(item) {
            orderListContent += `
                <div class="list__item">
                    <span class="order__name" id="${item.name.toLowerCase()}">${item.name}</span>
                    <span class="order__remove" id="order__remove" data-${item.name.toLowerCase()}-del="${item.id}-del">remove</span>
                    <span class="order__price" id="${item.name.toLowerCase()}-order"><span class="dollar">$</span>0</span>
                </div>
            `
    })
    return orderListContent
}

function render() {
    collectItemsHTML()
    collectOrderListHTML()
    itemsSection.innerHTML = itemsContent
    orderListSection.innerHTML = orderListContent
}

render()

document.addEventListener('click', function(e) {
    if (e.target.dataset.pizza) {
        handlePizzaClick()
    } else if (e.target.dataset.hamburger) {
        handleHamburgerClick()
    } else if (e.target.dataset.beer) {
        handleBeerClick()
    }
})

const pizzaOrder = document.getElementById("pizza-order")
const hamburgerOrder = document.getElementById("hamburger-order")
const beerOrder = document.getElementById("beer-order")
         
function handlePizzaClick() {
        orderArray[0].quantity++
        orderArray[0].price += 14
        pizzaOrder.innerHTML = `
            <span class="order__price" id="pizza-order">${orderArray[0].quantity} x <span class="dollar">$</span>${orderArray[0].price}</span>
            `
        collectTotal()
}

function handleHamburgerClick() {
        orderArray[1].quantity++
        orderArray[1].price += 12
        hamburgerOrder.innerHTML = `
            <span class="order__price" id="hamburger-order">${orderArray[1].quantity} x <span class="dollar">$</span>${orderArray[1].price}</span>
            `    
        collectTotal()
}

function handleBeerClick() {
        orderArray[2].quantity++
        orderArray[2].price += 12
        beerOrder.innerHTML = `
            <span class="order__price" id="beer-order">${orderArray[2].quantity} x <span class="dollar">$</span>${orderArray[2].price}</span>
            `    
        collectTotal()
}

let totalTotal

function collectTotal() {
    let pizzaTotalString = document.getElementById('pizza-order').textContent
    let pizza = Number(pizzaTotalString.slice(pizzaTotalString.lastIndexOf('$') + 1))

    let hamburgerTotalString = document.getElementById('hamburger-order').textContent
    let hamburger = Number(hamburgerTotalString.slice(hamburgerTotalString.lastIndexOf('$') + 1))

    let beerTotalString = document.getElementById('beer-order').textContent
    let beer = Number(beerTotalString.slice(beerTotalString.lastIndexOf('$') + 1))

    let total = pizza + hamburger + beer
    totalPrice.innerHTML = `<span class="dollar">$</span>${total}`    
    totalTotal = total
}

document.addEventListener('click', function(e) {
    if (e.target.dataset.pizzaDel) {
        handlePizzaDelClick()
    } else if (e.target.dataset.hamburgerDel) {
        handleHamburgerDelClick()
    } else if (e.target.dataset.beerDel) {
        handleBeerDelClick()
    }
})

function handlePizzaDelClick() {
    if (orderArray[0].quantity > 1) {
        orderArray[0].quantity--
        orderArray[0].price -= 14
        pizzaOrder.innerHTML = `
            <span class="order__price" id="pizza-order">${orderArray[0].quantity} x <span class="dollar">$</span>${orderArray[0].price}</span>
            `
        collectTotal()
    } else if (orderArray[0].quantity === 1) {
        orderArray[0].price -= 14
        orderArray[0].quantity--
        pizzaOrder.innerHTML = `
            <span class="order__price" id="pizza-order"><span class="dollar">$</span>${orderArray[0].price}</span>
            `
        collectTotal()
    }
}

function handleHamburgerDelClick() {
    if (orderArray[1].quantity > 1) {
        orderArray[1].quantity--
        orderArray[1].price -= 12
        hamburgerOrder.innerHTML = `
            <span class="order__price" id="hamburger-order">${orderArray[1].quantity} x <span class="dollar">$</span>${orderArray[1].price}</span>
            `
        collectTotal()
    } else if (orderArray[1].quantity === 1) {
        orderArray[1].price -= 12
        orderArray[1].quantity--
        hamburgerOrder.innerHTML = `
            <span class="order__price" id="hamburger-order"><span class="dollar">$</span>${orderArray[1].price}</span>
            `
        collectTotal()
    }
}

function handleBeerDelClick() {
    if (orderArray[2].quantity > 1) {   
        orderArray[2].quantity--
        orderArray[2].price -= 12
        beerOrder.innerHTML = `
            <span class="order__price" id="beer-order">${orderArray[2].quantity} x <span class="dollar">$</span>${orderArray[2].price}</span>
            `
        collectTotal()
    } else if (orderArray[2].quantity === 1) {
        orderArray[2].price -= 12
        orderArray[2].quantity--
        beerOrder.innerHTML = `
            <span class="order__price" id="beer-order"><span class="dollar">$</span>${orderArray[2].price}</span>
            `
        collectTotal()
    }
}

orderBtn.addEventListener('click', function() {
    if (totalTotal > 0) {
        modalSection.style.display = 'block'
    }
})
