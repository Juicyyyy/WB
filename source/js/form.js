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

// валидация формы

function validation(form) {

  let result = true;
  const allInputs = form.querySelectorAll('input');

  for (const input of allInputs) {

    const span = form.querySelector('.recipient__span');
    span.style.display = 'none';

    if(input.value == "") {
      input.parentElement.parentElement.firstElementChild.style.display = 'none';
    } else {
      input.parentElement.parentElement.firstElementChild.style.display = 'block';
    }

    removeError(input);

    if(input.value == "") {

      if(input.dataset.type == "name") {
        createError(input, 'Укажите имя');
      } else if (input.dataset.type == "surname") {
        createError(input, 'Введите фамилию');
      } else if (input.dataset.type == "email") {
        createError(input, 'Укажите электронную почту');
      } else if (input.dataset.type == "phone") {
        createError(input, 'Укажите номер телефона');
      } else if (input.dataset.type == "number") {
        createError(input, 'Укажите ИНН');
      }

      result = false;
    }

    createErrorEmail(input);
  }
  return result;
}


const form = document.querySelector('.recipient__form');
const allInputs = form.querySelectorAll('input');

for (let index = 0; index < allInputs.length; index++) {
  let input = allInputs[index];
  input.addEventListener('input', () => {
    createErrorEmail(input);
  });
}

function createErrorEmail(input) {
  removeError(input);
  const patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if((input.dataset.type == "email") && (input.value !== "")) {
    if (!patternEmail.test(input.value)) {
      removeError(input);
      createError(input, 'Проверьте адрес электронной почты');
    }
  }
}

function createError(input, text) {
  const parent = input.parentNode;
  const errorLabel = document.createElement('label');

  errorLabel.classList.add('errorLabel');
  errorLabel.textContent = text;
  parent.classList.add('error');

  parent.append(errorLabel);
}

function removeError(input) {
  const parent = input.parentNode;

  if(parent.classList.contains('error')) {
    parent.querySelector('.errorLabel').remove();
    parent.classList.remove('error');
  }
}

document.querySelector('.summary__button').addEventListener('click', function(event) {
  event.preventDefault();

  const form = document.querySelector('.recipient__form');

  if (validation(form) === true) {
    alert('Форма успешно отправлена');
  }
})


function doFormat(value, pattern) {
    const strippedValue = value.replace(/[^0-9]/g, "");
    const chars = strippedValue.split('');

    let count = 0;
    let formatted = '';

    for (let i = 0; i < pattern.length; i++)
    {
        const char = pattern[i];
        if (chars[count])
        {
            if (/\*/.test(char)) {
                formatted += chars[count];
                count++;
            } else {
                formatted += char;
            }
        }
    }
    return formatted;
}

document.querySelectorAll('[data-format]').forEach(function (e) {

    function format(elem) {
         const val = doFormat(elem.value, elem.getAttribute('data-format'));
         elem.value = doFormat(elem.value, elem.getAttribute('data-format'), elem.getAttribute('data-format'));

        if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', val.length);
            range.select();
        } else if (elem.selectionStart) {
            elem.focus();
            elem.setSelectionRange(val.length, val.length);
        }
    }

    e.addEventListener('keyup', function () {
        format(e);
    });

    e.addEventListener('keydown', function () {
        format(e);
    });

    format(e)
});
