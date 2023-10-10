// форма способ оплаты
const formPayment = document.querySelector('.formPayment');
formPayment.addEventListener('submit', (event) => {
  event.preventDefault();
    const inputs = formPayment.querySelectorAll('.formPayment__input');
    const paymentCard = document.querySelector('.payment__card');
    const summaryCard = document.querySelector('.summary__card');

    for (let index = 0; index < inputs.length; index++) {
      let input = inputs[index];
      if(input.checked) {
        const label = input.nextElementSibling;
        let labelNumber = label.textContent;
        let labelImgPayment = label.firstElementChild.cloneNode(false);
        let labelImgSummary = label.firstElementChild.cloneNode(false);
        labelImgPayment.style.marginRight = '10px';
        labelImgSummary.style.marginRight = '10px';
        paymentCard.textContent = labelNumber;
        paymentCard.prepend(labelImgPayment);

        summaryCard.textContent = labelNumber;
        summaryCard.prepend(labelImgSummary);
      }
    }
    formPayment.style.opacity = 0;
    formPayment.style.visibility = 'hidden';
})

//форма способ доставки
const formDelivery = document.querySelector('.formDelivery');
formDelivery.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputs = formDelivery.querySelectorAll('.formDelivery__input');
  const inputsMethod = formDelivery.querySelectorAll('.formDelivery__method-radio');
  const paymentCard = document.querySelector('.delivery__textClient');
  const summaryCard = document.querySelector('.summary__adress');
  const deliveryMethod = document.querySelector('.delivery__text');
  const summaryMethod = document.querySelector('.summary__method');

  for (let index = 0; index < inputs.length; index++) {
    let input = inputs[index];
    if(input.checked) {
      const label = input.nextElementSibling;
      let labelText = label.textContent;
      paymentCard.textContent = labelText;
      summaryCard.textContent = labelText;
    }
  }
  for (let index = 0; index < inputsMethod.length; index++) {
    let inputMethod = inputsMethod[index];
    if(inputMethod.checked) {
      const span = inputMethod.nextElementSibling;
      let spanText = span.textContent;
      deliveryMethod.textContent = spanText;
      summaryMethod.textContent = 'Доставка ' + spanText.toLowerCase() ;
    }
  }
  formDelivery.style.opacity = 0;
  formDelivery.style.visibility = 'hidden';
});



