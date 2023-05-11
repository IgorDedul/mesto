import { Popup } from './Popup.js';

export default class PopupWithForm extends Popup {
  // Принимает в конструктор селектор popup и callback сабмита формы
  constructor(selectorPopup, { callbackFormSubmit }) {
    super(selectorPopup);
    this._callbackFormSubmit = callbackFormSubmit;
    /** this_.selectorPopup находится в родительском классе**/
    this._popupFormItem = this_.selectorPopup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupFormItem.querySelectorAll('.popup__input'));
    this._sendButton = this_.selectorPopup.querySelector('.popup__submit');
    this._sendButtonText = this._sendButton.textContent;
  }
  // Метод собирает данные всех полей формы
  _getInputValues() {
    // Наполняем пустой массив данными через forEach
    const formValues = {};
    this._inputList.forEach(inputItem => {
      formValues[inputItem.name] = inputItem.value;
    });
    return formValues;
  }
  
  // Связываем с методом getInputValues, добавляем обработчик клика и обработчик сабмита формы
  setEventListeners() {
    // Перезаписывает родительский метод setEventListeners
    super.setEventListeners();
    this._popupFormItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackFormSubmit(this._getInputValues());
    });
  }

  // Метод перезаписывает при закрытия родителя popup
  close() {
    super.close();
    // Сбрасываем форму
    this._popupFormItem.reset();
  }
}