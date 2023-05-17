import Popup from './Popup.js';
//Данного класса нет в задании. Был создан для отображения картинки.
//Смысл его в создании экземпляра с наследованием из Popup, но в отличии
//от PopupWithForm не требует колбек кнопки

export default class PopupWithImage extends Popup {
  // Принимает в конструктор селектор popup
  constructor(popupSelector) {
    super(popupSelector);
    // this._elementPopup находится в родительском классе
    this._popupDescription = this._elementPopup.querySelector('.popup__name-image');
    this._popupImage = this._elementPopup.querySelector('.popup__link-image');
  }
  // Метод перезаписывает родительский метод open
  open(description, image) {
    // Вставляем в popup картинку с src изображения и подписью к картинке
    this._popupDescription.textContent = description;
    this._popupImage.src = image;
    this._popupImage.alt = description;
    super.open();
  }
}