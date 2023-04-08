const validationConfig = {
    formSelector: '.popup__input-list',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    submitButtonActive: 'popup__save-button',
    submitButtonDisactive: 'popup__save-button_disabled',
    inputErrorLine: 'popup__input_line-error'
  };


function enableValidation({formSelector, ...rest}) {
  const formsSelector = Array.from(document.querySelectorAll(formSelector));
  formsSelector.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    })
    setEventListeners(form, rest);
  })
}

function setEventListeners(form, {inputSelector, submitButtonSelector, ...rest}) {
  const formInputSelector = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);
  disableButton(formButton, rest);
  formInputSelector.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      if (hasInvalidInput(formInputSelector)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);    
      };
    })
  });
}

function checkInputValidity(input, {inputErrorLine}) {
  const currentInputError = document.querySelector(`#${input.id}-error`)
  const formLineInput = document.querySelector(`#${input.id}`);
  if (input.checkValidity()) {
    currentInputError.textContent = '';
    formLineInput.classList.remove(inputErrorLine);
  } else {
    currentInputError.textContent = input.validationMessage;
    formLineInput.classList.add(inputErrorLine);
  };
}

function hasInvalidInput(formInputSelector) {
  return formInputSelector.some(item => !item.validity.valid);
};

function enableButton(button, {submitButtonActive, submitButtonDisactive}) {
  button.classList.remove(submitButtonDisactive);
  button.classList.add(submitButtonActive);
  button.setAttribute('enable', true);
};

function disableButton(button, {submitButtonActive, submitButtonDisactive}) {
  button.classList.add(submitButtonDisactive);
  button.classList.remove(submitButtonActive);
  button.removeAttribute('disable', true);
};

enableValidation(validationConfig);