export default class Card {
    constructor(cardObject, templateElement) {
        //Основные данные и с теплайт элемента
        this._card = cardObject;
        this._cardName = this._card.name;
        this._cardLink = this._card.link;
        this._cardTemplate = templateElement;
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
        this._elementImages.addEventListener('click', this._openPopupShow);
    };

    //Удаление элемента
    _deleteElement(event) {
        const delElement = event.target.closest('.element__item');
        delElement.remove();
    };

    //Измение состояние лайка
    _toggleLike(event) {
        const like = event.target;
        like.classList.toggle('element__like_active');
    };

    //Отображение попапа картинки
    _openPopupShow(event) {
        const img = event.target;
        const searchNameElement = event.target.closest('.element__card');
        const nameElement = searchNameElement.querySelector('.element__name');
        const linkImage = document.querySelector('.popup__link-image');
        const nameImage = document.querySelector('.popup__name-image');
        const popupShowElement = document.querySelector('.popup_image');

        linkImage.src = img.src;
        linkImage.alt = img.alt;
        nameImage.textContent = nameElement.textContent;
        
        /**openPopup(popupShowElement); - пока выключен, т.к. нет видимости из модуля функций Index.js**/
        popupShowElement.classList.add('popup_opened');

    }
    
}
