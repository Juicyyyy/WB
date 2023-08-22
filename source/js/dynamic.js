
summaryPrice();

function summaryPrice() {
  const productPrice = document.querySelectorAll('.basket__list-newPrice');
  const productOldPrice = document.querySelectorAll('.basket__list-oldPrice');
  const productSum = document.querySelector('.sum-js');
  const productSumOldPrice = document.querySelector('.oldPrice-js');
  const productSale = document.querySelector('.sale-js');

  const basketSummary = document.querySelector('.basket__summary');
  let price = [];
  let oldPrice = [];

  for (let i = 0; i < productPrice.length; i++) {
    price.push(parseInt(productPrice[i].innerText));
  }

  for (let i = 0; i < productOldPrice.length; i++) {
    oldPrice.push(parseInt(productOldPrice[i].innerText));
  }

  let sum = 0;
  let sumOldPrice = 0;
  for (let i = 0; i < price.length; i++) {
    sum += price[i];
  }

  for (let i = 0; i < oldPrice.length; i++) {
    sumOldPrice += oldPrice[i];
  }

  productSum.textContent = numberWithSpaces(sum) + ' сом';
  basketSummary.textContent = numberWithSpaces(sum) + ' сом';
  productSumOldPrice.textContent = numberWithSpaces(sumOldPrice) + ' сом';
  productSale.textContent = numberWithSpaces(sum - sumOldPrice) + ' сом';
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
      let a;

      if(direction === 'plus') {
        newValue = currentValue + 1;
        newPrice.textContent = parseInt(newPrice.textContent) + +priceProduct + ' сом';
        oldPrice.textContent = parseInt(oldPrice.textContent) + +saleProduct + ' сом';
        variable = parseInt(quantityProduct.textContent) + 1;
        quantityProduct.textContent = variable > 4 ? variable + ' товаров' : variable + ' товара';
        basketQuantity.textContent = variable > 4 ? variable + ' товаров' : variable + ' товара';
        summaryPrice();
      } else {
        newValue = currentValue - 1 > 1 ? currentValue - 1 : 1;
        newPrice.textContent = parseInt(newPrice.textContent) - +priceProduct + ' сом';
        oldPrice.textContent = parseInt(oldPrice.textContent) - +saleProduct + ' сом';
        variable = parseInt(quantityProduct.textContent) - 1;
        quantityProduct.textContent = variable > 4 ? variable + ' товаров' : variable + ' товара';
        basketQuantity.textContent = variable > 4 ? variable + ' товаров' : variable + ' товара';
        summaryPrice();
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





