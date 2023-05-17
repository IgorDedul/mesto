import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../components/initialCards.js'
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
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


//Создание экземпляра класса пользователя
const profileInfo = new UserInfo(selectorUserName, selectorUserAbout);

//Запуск Section отрисовки карт
const cardList = new Section ({
    items: initialCards,
    renderer: createNewCard
    }, listSelector);
cardList.render();

//Подготовка новой карты
function createNewCard(item) {
    const card = new Card (item, templateSelector, handleCardClick);
    return card.createCard();
}

//Добавление нового элемента
function handleAddElement() {
    const newAddElementCard = popupOpenedAddElement._getInputValues();

    const cardName = newAddElementCard.name;
    const cardLink = newAddElementCard.link;
    const addCard = {name: cardName, link: cardLink};
    cardList.addItem(addCard); /**Использует функцию Section **/
    popupAddElementFormValidator._disableButton();
};

//Заполнение данных профиля
function fillProfileInputs() {
   profileInfo.setUserInfo(userNameInput, userAboutInput);
};

//Обработка формы заполнения профиля
function handlePopupAddFormSubmit() {
    const userInfo = popupOpenedEditProfile._getInputValues();
    userName.textContent = userInfo.userName;
    userAbout.textContent = userInfo.userAbout;
};

//Включение класса PopupWithForm для открытия попапа обработки кнопок
function openPopupForm(selectorPopup, callbackFormSubmit) {
    const popupActiveForm = new PopupWithForm (selectorPopup, callbackFormSubmit);
    popupActiveForm.setEventListeners();
    return popupActiveForm;
};

//Включение класса PopupWithImage для открытия изображения
function openPopupImage(selectorPopup) {
    const popupImage = new PopupWithImage (selectorPopup);
    popupImage.setEventListeners();
    return popupImage;
}

//Обработчик открытия попапа изображения
function handleCardClick(name, link) {
    popupOpenedImage.open(name, link);
}

//Включение валидации для каждой из форм отдельно
    //Валидация формы профиля
    const popupEditProfileFormValidator = new FormValidator (validationConfig, popupEditProfile);
    popupEditProfileFormValidator.enableValidation();
    //Валидация формы добавления нового элемента
    const popupAddElementFormValidator = new FormValidator (validationConfig, popupAddElement);
    popupAddElementFormValidator.enableValidation();


//Инициализация попапов
    //Инициализация попапа профиля пользователя
    const popupOpenedEditProfile = openPopupForm(selectorPopupEditProfile, handlePopupAddFormSubmit);
    //Инициализация попапа добавления элемента
    const popupOpenedAddElement = openPopupForm(selectorPopupAddElement, handleAddElement);
    //Инициализация попапа открыти картинки путём создания экземпляра класса PopupWithImage
    const popupOpenedImage = openPopupImage (selectorShowElement);

//Запуск попапов (через экземпляр класса объявленный в инициализации)
popupOpenEditProfileElement.addEventListener('click', () => {
    popupOpenedEditProfile.open();
    //Заполнение данных профиля
    fillProfileInputs();
});

popupOpenAddElement.addEventListener('click', () => {
    popupOpenedAddElement.open();
});