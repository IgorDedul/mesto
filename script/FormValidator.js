export default class FormValidator {
  constructor (validationConfig, validationObject) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._submitButtonActive = validationConfig.submitButtonActive;
    this._submitButtonDisactive = validationConfig.submitButtonDisactive;
    this._inputErrorLine = validationConfig.inputErrorLine;
    this._validationObject = validationObject;
  }

  //Публичный метод включения валидации заданной формы
  enableValidation() {
    this._setEventListeners();
  }

  //Слушатель валидации
  _setEventListeners() {
    const formInputSelector = Array.from(this._validationObject.querySelectorAll(this._inputSelector));
    const formButton = this._validationObject.querySelector(this._submitButtonSelector);
    this._disableButton(formButton);
    formInputSelector.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput(formInputSelector)) {
          this._disableButton(formButton);
        } else {
          this._enableButton(formButton);    
        };
      })
    });
  }

  //Проверка ввода и подключение строки об ошибке
  _checkInputValidity(input) {
    const currentInputError = document.querySelector(`#${input.id}-error`)
    const formLineInput = document.querySelector(`#${input.id}`);
    if (input.checkValidity()) {
      currentInputError.textContent = '';
      formLineInput.classList.remove(this._inputErrorLine);
    } else {
      currentInputError.textContent = input.validationMessage;
      formLineInput.classList.add(this._inputErrorLine);
    };
  }

  //Проверка валидности браузерным методом
  _hasInvalidInput(formInputSelector) {
    return formInputSelector.some(item => !item.validity.valid);
  };

  //Проверка валидности браузерным методом
  _hasInvalidInput(formInputSelector) {
    return formInputSelector.some(item => !item.validity.valid);
  };

  //Кнопка принять активна
  _enableButton(button) {
    button.classList.remove(this._submitButtonDisactive);
    button.disabled = false;
  };

  //Кнопка принять деактивирована
  _disableButton(button) {
    button.classList.add(this._submitButtonDisactive);
    button.disabled = true;
  };

}

