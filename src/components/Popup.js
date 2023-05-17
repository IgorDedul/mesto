export default class Popup {
    //Конструктор принимает селетор попапа
    constructor (selectorPopup) {
        this._elementPopup = document.querySelector(selectorPopup);
        //Привязка функции ждя защиты от потери контента
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    //Открытие попапа
    open() {
    this._elementPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    }

    //Закрытие попапа
    close() {
    this._elementPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    }

    //Закрытие попапа клавишей Esc
    _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
      }
    }

    //Закрытие попапа по клику на оверлей или кнопку закрыть
    setEventListeners() {
        this._elementPopup.addEventListener('mousedown', (evt) => { 
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
                this.close();
                } 
            })
    };

}