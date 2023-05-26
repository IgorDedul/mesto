import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../components/initialCards.js'
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// Импорт стилей
import './index.css';

//Константы на открытие попапов
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');
const popupAvatarElement = document.querySelector('.popup_avatar');

//Константы селекторов попапов
const selectorPopupEditProfile = '.popup_edit-profile';
const selectorPopupAddElement = '.popup_add-element';
const selectorPopupImage = '.popup_image';
const selectorPopupSubmit = '.popup_delete-card';
const selectorPopupAvatar = '.popup_avatar' 

//Константы кнопок открытия попапов
const popupOpenEditProfileElement = document.querySelector('.profile__edit-button');
const popupOpenAddElement = document.querySelector('.profile__add-button');
const popupOpenAvatarElement = document.querySelector('.profile__avatar-edit');

//Константы попапа профиля
const selectorUserName = '.profile__title';
const selectorUserAbout = '.profile__subtitle';
const selectorUserAvatar = '.profile__avatar';
const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__subtitle');
const userNameInput = document.querySelector('.popup__name-input');
const userAboutInput = document.querySelector('.popup__about-input');
const profileForm = document.querySelector('.popup__input-list');

//Константы для попапа добавления нового элемента-карты
const placeElement = document.querySelector('.popup__place-input');
const urlElement = document.querySelector('.popup__url-input');
const newElementButton = document.querySelector('.popup__element-list');

//Константы для темплейт элементов новых карт
const templateSelector = '.element__template';
const listSelector = '.element__list';

//Объект с данными для авторизации API
const apiAuthorizationData = {
    link: 'https://mesto.nomoreparties.co/v1/cohort-66/',
    headers: {
      authorization: '87e7fffd-44f4-496a-a376-493e7b9c6ebf',
      'Content-Type': 'application/json'
    }
  }

//Объект с селекторами для валидации
const validationConfig = {
    formSelector: '.popup__input-list',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    submitButtonActive: 'popup__save-button',
    submitButtonDisactive: 'popup__save-button_disabled',
    inputErrorLine: 'popup__input_line-error'
  };

//Объявим глобальную переменную для хранения ID пользователя, значение в него получим позже из промиса
let userId;

//Создание экземпляра класса Api
const apiConnect = new Api(apiAuthorizationData);

//Создание экземпляра класса пользователя
const profileInfo = new UserInfo(selectorUserName, selectorUserAbout, selectorUserAvatar);

//Запуск Section отрисовки карт
const cardList = new Section ({
    renderer: (cardObject) => {
        cardList.addItem(createNewCard(cardObject));
      }
    }, listSelector);

// Общий промис, срабатывающий при положительном результате обоих запросов
Promise.all([ apiConnect.getUserData(), apiConnect.getInitialCards() ])
    .then(([ userProfileData, cardObject ]) => {
        userId = userProfileData._id;
        profileInfo.setUserInfo({ username: userProfileData.name, description: userProfileData.about });
        cardList.render(cardObject.reverse());
        profileInfo.setUserAvatar(userProfileData.avatar);
    })
    .catch((err) => { console.log(`Ошибка обращения к серверу ${err}`) })

//Подготовка новой карты (работа через API)
function createNewCard(cardObject) {
    const card = new Card (cardObject, templateSelector, userId, { cardId: cardObject._id, authorId: cardObject.owner._id, }, {
        // Увеличение картинки
        handleCardZoom: (name, image) => { popupImage.open(name, image) },
        // Удаление карточки
        handleCardDelete: (cardElement, cardId) => { popupSubmit.open(cardElement, cardId) },
        // Добавление лайка
        handleCardLike: (cardId) => { apiConnect.putCardLike(cardId)
            .then((res) => {
              card.renderCardLike(res);
            })
            .catch((err) => { console.log(`Ошибка при лайке, ${err}`) })
        },
        // Удаление лайка
        handleCardDeleteLike: (cardId) => { apiConnect.deleteCardLike(cardId)
            .then((res) => {
              card.renderCardLike(res);
            })
            .catch((err) => { console.log(`Ошибка при дизлайке, ${err}`) })
        },
    });
    return card.createCard();
}
    
//Запуск класса попапа отображения увеличенного изображения
const popupImage = new PopupWithImage (selectorPopupImage);
popupImage.setEventListeners();

//Запуск класса попапа подтверждения удаления карточки
const popupSubmit = new PopupWithSubmit(selectorPopupSubmit, {
   callbackSubmit: (cardElement, cardId) => { apiConnect.deleteCard(cardId)
        .then(() => {
          cardElement.deleteElement();
          popupSubmit.close();
        })
        .catch((err) => { console.log(`Ошибка удаления карточки, ${err}`) })
    }
  });    
popupSubmit.setEventListeners();
  
//Запуск класса попапа редактирования профиля
const popupEditeProfile = new PopupWithForm(selectorPopupEditProfile, {
    callbackFormSubmit: (userProfileData) => { popupEditeProfile.putSavingProcessText(); apiConnect.sendUserData(userProfileData)
        .then((res) => {
          profileInfo.setUserInfo({ username: res.name, description: res.about });
          popupEditeProfile.close();
        })
        .catch((err) => { console.log(`Ошибка редактирования профиля, ${err}`) })
        .finally(() => {
          popupEditeProfile.returnSavingProcessText();
        })
    }
  });
  popupEditeProfile.setEventListeners();

//Запуск класса попапа редактирования аватара
const popupEditeAvatar = new PopupWithForm(selectorPopupAvatar, {
    callbackFormSubmit: (userProfileData) => { popupEditeAvatar.putSavingProcessText(); apiConnect.sendAvatarData(userProfileData)
        .then((res) => {
          profileInfo.setUserAvatar(res.avatar);
          popupEditeAvatar.close();
        })
        .catch((err) => { console.log(`Ошибка редактирования аватара, ${err}`) })
        .finally(() => {
          popupEditeAvatar.returnSavingProcessText();
        })
    }
  });
  popupEditeAvatar.setEventListeners();

//Запуск класса попапа добавления новой карточки
const popupAddCard = new PopupWithForm(selectorPopupAddElement, {
    callbackFormSubmit: (formValues) => { popupAddCard.putSavingProcessText(); apiConnect.addNewCard({ name: formValues.name, link: formValues.link })
        .then((card) => {
          cardList.addItem(createNewCard(card));
          popupAddCard.close();
        })
        .catch((err) => { console.log(`Ошибка добавления новой карточки, ${err}`) })
        .finally(() => {
          popupAddCard.returnSavingProcessText();
        })
    }
  });
  popupAddCard.setEventListeners();

//Заполнение данных профиля
function fillProfileInputs() {
    const actualUserInfo = profileInfo.getUserInfo();
    userNameInput.value = actualUserInfo.username;
    userAboutInput.value = actualUserInfo.description;
 };


//Включение валидации для каждой из форм отдельно
    //Валидация формы профиля
    const popupEditProfileFormValidator = new FormValidator (validationConfig, popupEditProfile);
    popupEditProfileFormValidator.enableValidation();
    //Валидация формы добавления нового элемента
    const popupAddElementFormValidator = new FormValidator (validationConfig, popupAddElement);
    popupAddElementFormValidator.enableValidation();
    //Валидация попапа обновление аватара
    const popupAvatarValidator = new FormValidator (validationConfig, popupAvatarElement);
    popupAvatarValidator.enableValidation();


//Запуск попапов (через экземпляр класса объявленный в инициализации)
popupOpenEditProfileElement.addEventListener('click', () => {
    popupEditeProfile.open();
    popupEditProfileFormValidator.resetValidation();
    //Заполнение данных профиля
    fillProfileInputs();
});

popupOpenAvatarElement.addEventListener('click', () => {
    popupEditeAvatar.open();
    popupAvatarValidator.resetValidation();
})

popupOpenAddElement.addEventListener('click', () => {
    popupAddCard.open();
    popupAddElementFormValidator.resetValidation();
});
