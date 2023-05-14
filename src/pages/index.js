import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../components/initialCards.js'
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Импорт стилей
import './index.css';

//Константы на открытие попапов
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');

//Константы селекторов попапов
const selectorPopupEditProfile = '.popup_edit-profile';
const selectorPopupAddElement = '.popup_add-element';

//Константы кнопок открытия попапов
const popupOpenEditProfileElement = document.querySelector('.profile__edit-button');
const popupOpenAddElement = document.querySelector('.profile__add-button');

//Константы попапа профиля
const selectorUserName = '.profile__title';
const selectorUserAbout = '.profile__subtitle';
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

// Константы классов необходимые для открытия картинки
const linkImage = document.querySelector('.popup__link-image');
const nameImage = document.querySelector('.popup__name-image');
const popupShowElement = document.querySelector('.popup_image');
const selectorShowElement = '.popup_image';


const validationConfig = {
    formSelector: '.popup__input-list',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    submitButtonActive: 'popup__save-button',
    submitButtonDisactive: 'popup__save-button_disabled',
    inputErrorLine: 'popup__input_line-error'
  };


//Запуск Section отрисовки карт
const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card (item, templateSelector, handleCardClick);
        return card.createCard();
    },
}, listSelector);
cardList.render();

//Добавление нового элемента
function handleAddElement() {
    const cardName = placeElement.value;
    const cardLink = urlElement.value;
    const addCard = {name: cardName, link: cardLink};
    cardList.addItem(addCard); /**Использует функцию Section **/
    popupAddElementFormValidator.resetValidation();
};

//Заполнение данных профиля
function fillProfileInputs(selectorUserName, selectorUserAbout) {
    const profileInfo = new UserInfo(selectorUserName, selectorUserAbout);
    profileInfo.setUserInfo(userNameInput, userAboutInput);
};

//Обработка формы заполнения профиля
function handlePopupAddFormSubmit() {
    userName.textContent = userNameInput.value;
    userAbout.textContent = userAboutInput.value;
};

//Открытие попапа
function openPopup(selectorPopup) {
    const popupActive = new Popup (selectorPopup);
    popupActive.open();
    popupActive.setEventListeners();
};

//Включение класса PopupWithForm для обработки кнопок
function openPopupForm(selectorPopup, callbackFormSubmit) {
    const popupActiveForm = new PopupWithForm (selectorPopup, callbackFormSubmit);
    popupActiveForm.setEventListeners();
};

//Обработчик открытия попапа изображения
function handleCardClick(name, link) {
    linkImage.src = link;
    linkImage.alt = name;
    nameImage.textContent = name;
    openPopup(selectorShowElement);
}

//Включение валидации для каждой из форм отдельно
    //Валидация формы профиля
    const popupEditProfileFormValidator = new FormValidator (validationConfig, popupEditProfile);
    popupEditProfileFormValidator.resetValidation();
    popupEditProfileFormValidator.enableValidation();
    //Валидация формы добавления нового элемента
    const popupAddElementFormValidator = new FormValidator (validationConfig, popupAddElement);
    popupAddElementFormValidator.resetValidation();
    popupAddElementFormValidator.enableValidation();


//Запуск попапов
popupOpenEditProfileElement.addEventListener('click', () => {
    openPopup(selectorPopupEditProfile);
    //Заполнение данных профиля
    fillProfileInputs(selectorUserName, selectorUserAbout);
    openPopupForm(selectorPopupEditProfile, handlePopupAddFormSubmit);
});


popupOpenAddElement.addEventListener('click', () => {
    openPopup(selectorPopupAddElement)
    openPopupForm(selectorPopupAddElement, handleAddElement);
});