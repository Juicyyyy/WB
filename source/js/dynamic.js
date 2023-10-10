
summaryPrice();

function summaryPrice() {
  const productSum = document.querySelector('.sum-js');
  const productSumOldPrice = document.querySelector('.oldPrice-js');
  const productSale = document.querySelector('.sale-js');
  const quantityProduct = document.querySelector('.quantity-js');
  const basketQuantity = document.querySelector('.basket__quantity');
  const basketList = document.querySelectorAll('.basket__list');
  const basketSummary = document.querySelector('.basket__summary');
  let price = [];
  let oldPrice = [];
  let i, j, k;
  let quantity = [];

  for (let index = 0; index < basketList.length; index++) {
    let product = basketList[index];
    const priceActive = product.querySelector('.basket__list-newPrice');
    const oldPriceActive = product.querySelector('.basket__list-oldPrice');
    const quantityActive = product.querySelector('.count__number');

    price.push(parseInt(priceActive.innerText));
    oldPrice.push(parseInt(oldPriceActive.innerText));

    variable = parseInt(quantityProduct.textContent);
    quantity.push(parseInt(quantityActive.value));

    if(!product.classList.contains('active')) {
      i = price.indexOf(parseInt(priceActive.innerText));
      price.splice(i, 1);

      j = oldPrice.indexOf(parseInt(oldPriceActive.innerText));
      oldPrice.splice(j, 1);

      k = quantity.indexOf(parseInt(quantityActive.value));
      quantity.splice(k, 1);
    }
  }

  let sum = 0;
  let sumOldPrice = 0;
  let sumProduct = 0;
  for (let i = 0; i < price.length; i++) {
    sum += price[i];
  }

  for (let i = 0; i < oldPrice.length; i++) {
    sumOldPrice += oldPrice[i];
  }

  for (let i = 0; i < quantity.length; i++) {
    sumProduct += quantity[i];
  }

  productSum.textContent = numberWithSpaces(sum) + ' сом';
  basketSummary.textContent = numberWithSpaces(sum) + ' сом';
  productSumOldPrice.textContent = numberWithSpaces(sumOldPrice) + ' сом';
  productSale.textContent = numberWithSpaces(sum - sumOldPrice) + ' сом';
  basketQuantity.textContent = sumProduct > 4 ? sumProduct + ' товаров' : sumProduct + ' товара';
  quantityProduct.textContent = sumProduct > 4 ? sumProduct + ' товаров' : sumProduct + ' товара';

  if(checkboxSummary.checked === true) {
    buttonSummary.textContent = `Оплатить ${productSum.textContent}`;
  }
  else {
    buttonSummary.textContent = 'Заказать';
  }
}

function numberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


// счетчик товаров

const countBtn = document.querySelectorAll('.count__btn');

countBtn.forEach(btn => {
  btn.addEventListener('click',
    function() {
      const direction = this.dataset.direction;
      const input = this.parentElement.querySelector('.count__number');
      const btnMinus = this.parentElement.querySelector('.count__btnMinus');
      const btnPlus = this.parentElement.querySelector('.count__btnPlus');
      const quantity = this.parentElement.parentElement.querySelector('.quantity');
      const priceProduct = this.parentElement.dataset.price;
      const saleProduct = this.parentElement.dataset.sale;
      const newPrice = this.parentElement.parentElement.parentElement.querySelector('.basket__list-newPrice');
      const oldPrice = this.parentElement.parentElement.parentElement.querySelector('.basket__list-oldPrice');
      const quantityProduct = document.querySelector('.quantity-js');
      const basketQuantity = document.querySelector('.basket__quantity');
      const currentValue = +input.value;
      const quantityPlus = parseInt((quantity.textContent).replace(/[^\d]/g, ''));
      let newValue;
      let variable;

      if(direction === 'plus') {
        newValue = currentValue + 1;
        newPrice.textContent = parseInt(newPrice.textContent) + +priceProduct + ' сом';
        oldPrice.textContent = parseInt(oldPrice.textContent) + +saleProduct + ' сом';
        variable = parseInt(quantityProduct.textContent) + 1;
        summaryPrice();
        quantityProduct.textContent = variable > 4 ? variable + ' товаров' : variable + ' товара';
        basketQuantity.textContent = variable > 4 ? variable + ' товаров' : variable + ' товара';
      } else {
        newValue = currentValue - 1 > 1 ? currentValue - 1 : 1;
        newPrice.textContent = parseInt(newPrice.textContent) - +priceProduct + ' сом';
        oldPrice.textContent = parseInt(oldPrice.textContent) - +saleProduct + ' сом';
        variable = parseInt(quantityProduct.textContent) - 1;
        summaryPrice();
        quantityProduct.textContent = variable > 4 ? variable + ' товаров' : variable + ' товара';
        basketQuantity.textContent = variable > 4 ? variable + ' товаров' : variable + ' товара';
      }

      if(direction === 'plus' && newValue === quantityPlus) {
        btnPlus.setAttribute('disabled', 'disabled');
      } else {
        btnPlus.removeAttribute('disabled', 'disabled');
      }

      if(newValue === 1) {
        btnMinus.setAttribute('disabled', 'disabled');
      } else {
        btnMinus.removeAttribute('disabled', 'disabled');
      }

      input.value = newValue;
  })
})


// удаление товара
const productList = document.querySelector('#productList');
productList.addEventListener('click', deleteProduct);

function deleteProduct(event) {
	if (event.target.dataset.action !== 'delete') return;

	const parenNode = event.target.closest('.basket__list');
	parenNode.remove();
  renderCountBasket();
  summaryPrice();
}

// добавить товар в избранное
productList.addEventListener('click', likeProduct);

function likeProduct(event) {
	if (event.target.dataset.action !== 'like') return;

	const parenNode = event.target.closest('.basket__list');
	parenNode.remove();
  renderCountBasket();
  summaryPrice();
}

// счетчик чекбоксов
productList.addEventListener('click', checkInput);

function checkInput(event) {
	if (event.target.dataset.action !== 'check') return;

	const parenNode = event.target.closest('.basket__list');
	parenNode.classList.toggle('active');
  renderCountBasket();
  summaryPrice();
}

// счетчик корзины
renderCountBasket();

function renderCountBasket() {
  const basket = document.querySelector('#basket');
  const basketList = document.querySelectorAll('.basket__list');
  const mobileBasket = document.querySelector('.mobileBasket');
  let countProducts = 0;

  for (let index = 0; index < basketList.length; index++) {
    let product = basketList[index];

    if(product.classList.contains('active')) {
      countProducts++;
    }
  }
  const countBasket = `<span class="countBasket">${countProducts}</span>`;
  basket.insertAdjacentHTML('beforeend', countBasket);
  mobileBasket.insertAdjacentHTML('beforeend', countBasket);
}

// счетчик товаров в блоке Способ доставки
renderCountProduct();
function renderCountProduct() {
  const deliveryImgOne = document.querySelector('.delivery__1img');
  const deliveryImgTwo = document.querySelector('.delivery__2img');
  const deliveryImgThree = document.querySelector('.delivery__3img');
  const deliveryImg = document.querySelector('.delivery__product');
  const deliveryDate = document.querySelector('.deliveryDate');
  let count;

  productList.addEventListener('click', (event) => {
    if (event.target.dataset.number === '1') {
      deliveryImgOne.classList.toggle('displayNone');
    }
    if (event.target.dataset.number === '2') {
      deliveryImgTwo.classList.toggle('displayNone');
    }
    if (event.target.dataset.number === '3') {
      deliveryImgThree.classList.toggle('displayNone');
    }
  })

  countBtn.forEach(btn => {
    btn.addEventListener('click',
      function(event) {
        const direction = this.dataset.direction;
        const countInput = this.parentElement.querySelector('.count__number');
        const dataNumber = event.target.closest('.basket__list');
        const countProduct = document.querySelectorAll('.countProduct');

        if(dataNumber.classList.contains('1')) {
          if(direction === 'plus') {
            opacityCountProduct(0);
          } else {
            opacityCountProduct(0);
          }
        } else if (dataNumber.classList.contains('2')) {
          if(direction === 'plus') {
            count = +countInput.value;
            if(count > 184) {
              deliveryDate.classList.remove('displayNone');
              count = +countInput.value - 184;
              countProduct[1].style.opacity = '1';
              countProduct[1].textContent = 184;
              countProduct[3].style.opacity = '1';
              countProduct[3].textContent = count;
            } else {
              deliveryDate.classList.add('displayNone');
              count = +countInput.value;
              countProduct[1].style.opacity = '1';
              countProduct[1].textContent = count;
            }
          } else {
            count = +countInput.value;
            if(count > 184) {
              deliveryDate.classList.remove('displayNone');
              count = +countInput.value - 184;
              countProduct[1].style.opacity = '1';
              countProduct[1].textContent = 184;
              countProduct[3].style.opacity = '1';
              countProduct[3].textContent = count;
            } else {
              deliveryDate.classList.add('displayNone');
              count = +countInput.value;
              countProduct[1].style.opacity = '1';
              countProduct[1].textContent = count;
              opacityCountProduct(1);
            }
          }
        } else if (dataNumber.classList.contains('3')) {
          if(direction === 'plus') {
            opacityCountProduct(2);
          } else {
            opacityCountProduct(2);
          }
        }

        function opacityCountProduct(num) {
          count = +countInput.value;
          if(count > 1) {
            countProduct[num].style.opacity = '1';
            countProduct[num].textContent = count;
          } else {
            countProduct[num].style.opacity = '0';
          }
        }
      })
    })
}


