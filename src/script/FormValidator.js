export default class FormValidator {
  constructor (validationConfig, validationObject) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._submitButtonActive = validationConfig.submitButtonActive;
    this._submitButtonDisactive = validationConfig.submitButtonDisactive;
    this._inputErrorLine = validationConfig.inputErrorLine;
    this._validationObject = validationObject;
    this._validationSettings = validationConfig;

    //Массив форм проверки валидации для очистки от ошибок
    this._inputList = Array.from(this._validationObject.querySelectorAll(this._inputSelector));
    this._formButton = this._validationObject.querySelector(this._submitButtonSelector);
  }

  //Публичный метод включения валидации форм
  enableValidation() {
    this._setEventListeners();
  }

  //Слушатель валидации
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    });
  }

  resetValidation() {
    this._inputList.forEach((inputItem) => { this._checkInputValidity(inputItem); })
    this._toggleButtonState();
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
  _hasInvalidInput() {
    return this._inputList.some(item => !item.validity.valid);
  };

  // Метод изменения состояния кнопки после валидации
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      // Отключаем кнопку при ошибке валидации
      this._disableButton();
    } else {
      // Включаем кнопку
      this._enableButton();
    }
  }

  //Кнопка принять активна
  _enableButton() {
    this._formButton.classList.remove(this._submitButtonDisactive);
    this._formButton.disabled = false;
  };

  //Кнопка принять деактивирована
  _disableButton() {
    this._formButton.classList.add(this._submitButtonDisactive);
    this._formButton.disabled = true;
  };

}

