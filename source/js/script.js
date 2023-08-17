
const providerM = document.querySelector('.providerM');
const providerWB = document.querySelectorAll('.providerWB');

providerM.addEventListener('mouseover', createBasketHoverM);
providerM.addEventListener('mouseout', removeBasketHover);

for (let index = 0; index < providerWB.length; index++) {
   let icon = providerWB[index];
   icon.addEventListener('mouseover', createBasketHoverWB);
   icon.addEventListener('mouseout', removeBasketHover);
}

function createBasketHoverWB() {
    document.body.insertAdjacentHTML("beforeend", `<div class="basket__hoverProvider">
    <p class="basket__hoverProvider-title">OOO «ВАЙЛДБЕРРИЗ»</p>
    <p class="basket__hoverProvider-text">ОГРН: 1067746062449</p>
    <p class="basket__hoverProvider-text">142181,Московская обл, г.о. Подольск, д Коледино, тер. Индустриальный парк Коледино, д. 6, стр. 1</p>
    </div>`);
    mouseBasketCoord();
}

function createBasketHoverM() {
    document.body.insertAdjacentHTML("beforeend", `<div class="basket__hoverProvider">
    <p class="basket__hoverProvider-title">OOO «МЕГАПРОФСТИЛЬ»</p>
    <p class="basket__hoverProvider-text">ОГРН: 5167746237148</p>
    <p class="basket__hoverProvider-text">129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34</p>
    </div>`);
    mouseBasketCoord();
}

function mouseBasketCoord() {
  const basketHover = document.querySelector('.basket__hoverProvider');
  document.addEventListener('mousemove', () => {
    basketHover.style.left = event.pageX - 124 + 'px';
    basketHover.style.top = event.pageY + 20 + 'px';
  });
}

function removeBasketHover() {
  const basketHover = document.querySelector('.basket__hoverProvider');
  basketHover.parentNode.removeChild(basketHover);
}

//

const deliveryText = document.querySelectorAll('.deliveryColorText');

for (let index = 0; index < deliveryText.length; index++) {
  let text = deliveryText[index];
  text.addEventListener('mouseover', createDeliveryHover);
  text.addEventListener('mouseout', removeDeliveryHover);
}

function createDeliveryHover() {
  document.body.insertAdjacentHTML("beforeend", `<div class="delivery__hover">
  <p class="delivery__hover-text">Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно</p>
  </div>`);
  mouseDeliveryCoord();
}

function mouseDeliveryCoord() {
  const deliveryHover = document.querySelector('.delivery__hover');
  document.addEventListener('mousemove', () => {
    deliveryHover.style.top = event.pageY + 10 + 'px';

    if( window.innerWidth >= 1400 ){
      deliveryHover.style.left = event.pageX - 124 + 'px';
    } else if ( window.innerWidth >= 1023){
      deliveryHover.style.left = event.pageX - 230 + 'px';
    }
    else {
      deliveryHover.style.left = event.pageX - 150 + 'px';
    }
  });
}

function removeDeliveryHover() {
  const deliveryHover = document.querySelector('.delivery__hover');
  deliveryHover.parentNode.removeChild(deliveryHover);
}

// взаимодействие чекбоксов

const inputBasketAll = document.querySelector('.basket__input');
const inputBasket = document.querySelectorAll('.input-js');

inputBasketAll.addEventListener('click', () => {
  if (inputBasketAll.checked === false) {
    for (let index = 0; index < inputBasket.length; index++) {
      let input = inputBasket[index];
      input.checked = false;
    }
  }
  else {
    for (let index = 0; index < inputBasket.length; index++) {
      let input = inputBasket[index];
      input.checked = true;
    }
  }
})

for (let index = 0; index < inputBasket.length; index++) {
  let input = inputBasket[index];
  input.addEventListener('click', () => {
    if(input.checked === false) {
      inputBasketAll.checked = false;
    }
    else {
      inputBasketAll.checked = true;
    }
  })
}

// изменение кнопки по чекбоксу

const checkboxSummary = document.querySelector('.summary__input');
const buttonSummary = document.querySelector('.summary__button');

checkboxSummary.addEventListener('click', () => {
  if(checkboxSummary.checked === true) {
    buttonSummary.textContent = 'Оплатить';
  }
  else {
    buttonSummary.textContent = 'Заказать';
  }
})

// скрытие блоков по кнопке

const buttonHideBasket = document.querySelector('.hideBasket');
const basketList = document.querySelector('.basket__wrapperList');

const buttonHideAbsent = document.querySelector('.hideAbsent');
const absentList = document.querySelector('.absent__product');

const basketCheckbox = document.querySelector('.basket__wrapperCheckbox');
const basketText = document.querySelector('.basket__summaryText');

buttonHideBasket.addEventListener('click', () => {
  if (getComputedStyle(basketList).display == 'flex') {
    basketList.style.display = 'none';
    buttonHideBasket.style.transform = 'rotate(-180deg)';
    basketCheckbox.style.display = 'none';
    basketText.style.display = 'block'
  } else {
    basketList.style.display = 'flex';
    buttonHideBasket.style.transform = 'rotate(0)';
    basketCheckbox.style.display = '';
    basketText.style.display = 'none'
  }
});

buttonHideAbsent.addEventListener('click', () => {
  if (getComputedStyle(absentList).display == 'flex') {
    absentList.style.display = 'none';
    buttonHideAbsent.style.transform = 'rotate(-180deg)';
  } else {
    absentList.style.display = 'flex';
    buttonHideAbsent.style.transform = 'rotate(0)';
  }
});

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
      const currentValue = +input.value;
      const quantityPlus = parseInt((quantity.textContent).replace(/[^\d]/g, ''));
      let newValue;

      if(direction === 'plus') {
        newValue = currentValue + 1;
      } else {
        newValue = currentValue - 1 > 1 ? currentValue - 1 : 1;
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
