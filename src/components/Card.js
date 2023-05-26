export default class Card {
    //1-Объект карточки, 2-Темплейт элемент, 3-Id пользователя, 4-Объект с данными, 5-Handle объект
    constructor(cardObject, templateElement, userId, authorData, handleActions) {
        //Основные данные и с теплайт элемента
        this._card = cardObject;
        this._cardName = this._card.name;
        this._cardLink = this._card.link;
        this._cardTemplate = templateElement;
        //Данные о пользователе
        this._userId = userId;
        this._cardId = authorData.cardId;
        this._authorId = authorData.authorId;
        //Handle-данные
        this._cardZoom = handleActions.handleCardZoom;
        this._cardDelete = handleActions.handleCardDelete;
        this._putLike = handleActions.handleCardLike;
        this._removeLike = handleActions.handleCardDeleteLike;
        //Привязка функций для защиты от потери контента
        this._likedCard = this._likedCard.bind(this);
        this._interactLike = this._interactLike.bind(this);
    }

    //Публичный метод для наполнения карточки  
    createCard() {
        this._cardElement = this._getTemplate();
        this._elementImages = this._cardElement.querySelector('.element__image');
        this._elementName = this._cardElement.querySelector('.element__name');
        this._likeIcon = this._cardElement.querySelector('.element__like');
        this._deleteIcon = this._cardElement.querySelector('.element__delete-button');
        this.likeСounter = this._cardElement.querySelector('.element__like-counter');
        // Передача данных в карточку
        this._elementName.textContent = this._cardName;
        this._elementImages.src = this._cardLink;
        this._elementImages.alt = this._cardName;
        //Включаем счётчик лайков
        this.renderCardLike(this._card);
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
        this._likeIcon.addEventListener('click', this._interactLike);
        this._elementImages.addEventListener('click',  () => {
                    this._cardZoom(this._cardName, this._cardLink)
        });
        //Удаление карты будет включено если ID пользователя совпадёт с ID создателя
        if (this._userId === this._authorId) {
            this._deleteIcon.addEventListener('click', () =>  this._cardDelete(this, this._cardId));
          } else {
            this._deleteIcon.remove();
          }          
    };

    //Удаление элемента (переделан в публичный метод)
    deleteElement() {
        this._cardElement.remove();
        this._cardElement = null;
    };


    // Общий метод реализации и отображения лайков и их количества
    renderCardLike(card) {
        this._likeArea = card.likes;
        if (this._likeArea.length === 0) {
            this.likeСounter.textContent = '';
        } else {
            // Брать количество лайков из ответа сервера
            this.likeСounter.textContent = this._likeArea.length;
        }
        if (this._likedCard()) {
            this._likeIcon.classList.add('element__like_active');
        } else {
            this._likeIcon.classList.remove('element__like_active');
        }
    }
    // Метод проверки наличия лайка на карточке
    _likedCard() {
        // Возврат без переменной
        return this._likeArea.find((like) => like._id === this._userId);
    }

    // Метод обработки добавления и снятия лайков
    _interactLike() {
        if (this._likedCard()) {
            this._removeLike(this._cardId);
        } else {
            this._putLike(this._cardId);
        }
    }
}
