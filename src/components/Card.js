export default class Card {
    constructor(cardObject, templateElement, handleCardClick) {
        //Основные данные и с теплайт элемента
        this._card = cardObject;
        this._cardName = this._card.name;
        this._cardLink = this._card.link;
        this._cardTemplate = templateElement;
        //Функция попапа изображения
        this._handleCardClick = handleCardClick;
        //Привязка функций для защиты от потери контента
        this._deleteElement = this._deleteElement.bind(this);
        this._toggleLike = this._toggleLike.bind(this);
    }

    //Публичный метод для наполнения карточки  
    createCard() {
        this._cardElement = this._getTemplate();
        this._elementImages = this._cardElement.querySelector('.element__image');
        this._elementName = this._cardElement.querySelector('.element__name');
        this._likeIcon = this._cardElement.querySelector('.element__like');
        this._deleteIcon = this._cardElement.querySelector('.element__delete-button');
        // Передача данных в карточку
        this._elementName.textContent = this._cardName;
        this._elementImages.src = this._cardLink;
        this._elementImages.alt = this._cardName;
        // Навешиваем слушатели
        this._setEventListener();
        // Возвращаем готовый экземпляр
        return this._cardElement;
    }  

    //Метод сбора с темплайт элемента
    _getTemplate() {
        return document.querySelector(this._cardTemplate).content.querySelector('.element__item').cloneNode(true);
      }

    //Добавление слушателей кликов  
    _setEventListener() {
        this._deleteIcon.addEventListener('click', this._deleteElement);
        this._likeIcon.addEventListener('click', this._toggleLike);
        this._elementImages.addEventListener('click',  () => {
            this._handleCardClick(this._cardName, this._cardLink)
        });
    };

    //Удаление элемента
    _deleteElement() {
        this._cardElement.remove();
        this._cardElement = null;
    };

    //Измение состояние лайка
    _toggleLike() {
        this._likeIcon.classList.toggle('element__like_active');
    };

}
