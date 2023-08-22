// открытие и закрытие модальных окон

const modalController = ({modal, btnOpen, btnClose}) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
  `;

  const closeModal = event => {
    const target = event.target;

    if (target === modalElem || (btnClose && target.closest(btnClose)) || event.code === 'Escape') {

      modalElem.style.opacity = 0;
      modalElem.style.visibility = 'hidden';
      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal)
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
};

modalController({
  modal: '.formPayment',
  btnOpen: '.btnFormPayment',
  btnClose: '.formPayment__btnClose',
});

modalController({
  modal: '.formDelivery',
  btnOpen: '.btnFormDelivery',
  btnClose: '.formDelivery__btnClose'
});

