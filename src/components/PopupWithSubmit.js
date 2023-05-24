import Popup from './Popup.js';
//Данный класс отвечает за работу попапа подтверждения

export default class PopupWithSubmit extends Popup {
  // Получает селектор, объект и карточку.
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    // this._elementPopup находится в родительском классе
    this._submitButton = this._elementPopup.querySelector('.popup__input-list');
    this._callbackSubmit = callbackSubmit;
  }
  // Получаем данные и наследуем open из родительского класса
  open(cardObject, cardId) {
    this._cardObject = cardObject;
    this._cardId = cardId;
    super.open();
  }
  // Навешиваем обработчики на кнопку подтверждения, наследуем из родителя остальные
  setEventListeners() {
    this._submitButton.addEventListener('submit', (evt) => { evt.preventDefault(); this._callbackSubmit(this._cardObject, this._cardId) })
    super.setEventListeners();
  }
}
