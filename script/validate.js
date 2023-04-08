/**const validationConfig = {
    formSelector: '.popup__input-list',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  };**/


const formSelector = document.querySelector('.popup__input-list');


function enableValidation() {
  formSelector.addEventListener('submit', (event) => {
    event.preventDefault();
  })
  setEventListeners(formSelector);
}

function setEventListeners(formSelector) {
  const formInputSelector = Array.from(formSelector.querySelectorAll('.popup__input'));
  const formButton = formSelector.querySelector('.popup__save-button');
  disableButton(formButton);
  formInputSelector.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
      if (hasInvalidInput(formInputSelector)) {
        disableButton(formButton);
      } else {
        enableButton(formButton);    
      };
    })
  });
}

function checkInputValidity(input) {
  const currentInputError = formSelector.querySelector(`#${input.id}-error`)
  const formLineInput = formSelector.querySelector(`#${input.id}`);
  if (input.checkValidity()) {
    currentInputError.textContent = '';
    formLineInput.classList.remove('popup__input_line-error');
  } else {
    currentInputError.textContent = input.validationMessage;
    formLineInput.classList.add('popup__input_line-error');
  };
}

function hasInvalidInput(formInputSelector) {
  return formInputSelector.some(item => !item.validity.valid);
};

function enableButton(button) {
  button.classList.remove('popup__save-button_disabled');
  button.classList.add('popup__save-button');
  button.setAttribute('enable', true);
};

function disableButton(button) {
  button.classList.add('popup__save-button_disabled');
  button.classList.remove('popup__save-button');
  button.removeAttribute('disable', true);
};

enableValidation();