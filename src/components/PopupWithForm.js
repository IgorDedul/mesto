import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  // Принимает в конструктор селектор popup и callback сабмита формы
  constructor(selectorPopup, callbackFormSubmit) {
    super(selectorPopup);
    this._callbackFormSubmit = callbackFormSubmit;
    this._popupFormItem = this._selectorPopup.querySelector('.popup__input-list');
    this._inputList = Array.from(this._popupFormItem.querySelectorAll('.popup__input'));
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
      this.close();
    });
  }

  // Метод перезаписывает при закрытия родителя popup
  close() {
    super.close();
    // Сбрасываем форму
    this._popupFormItem.reset();
  }
}