export default class Popup {
    //Конструктор принимает селетор попапа
    constructor (selectorPopup) {
        this_.selectorPopup = document.querySelector(selectorPopup);
    }

    //Открытие попапа
    open() {
    this_.selectorPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    }

    //Закрытие попапа
    close() {
    this_.selectorPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    }

    //Закрытие попапа клавишей Esc
    _handleEscClose(event) {
    if (event.key === "Escape") {
      this._close();
      }
    }

    //Закрытие попапа по клику на оверлей или кнопку закрыть
    setEventListeners() {
        this_.selectorPopup.addEventListener('mousedown', (evt) => { 
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
                this._close();
                } 
            })
    };

}