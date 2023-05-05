import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initialCards.js'

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');
const popupShowElement = document.querySelector('.popup_image');

const popupOpenEditProfileElement = document.querySelector('.profile__edit-button');
const popupOpenAddElement = document.querySelector('.profile__add-button');

const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__subtitle');
const userNameInput = document.getElementById('name-input');
const userAboutInput = document.getElementById('about-input');
const profileForm = document.querySelector('.popup__input-list');
const placeElement = document.getElementById('place-input');
const urlElement = document.getElementById('url-input');
const newElementButton = document.querySelector('.popup__element-list');

const templateSelector = '.element__template';
const template = document.querySelector('.element__template').content;
const list = document.querySelector('.element__list');


const validationConfig = {
    formSelector: '.popup__input-list',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    submitButtonActive: 'popup__save-button',
    submitButtonDisactive: 'popup__save-button_disabled',
    inputErrorLine: 'popup__input_line-error'
  };


//наполнение карточками по умолчанию
initialCards.forEach((elementCard) => {
    renderCard(elementCard);
});

//Метод предоставления карт  
function renderCard(createdCard) {
    const card = new Card (createdCard, templateSelector);
    const newElementCard = card.createCard();
    list.prepend(newElementCard);
}  

//Добавление нового элемента
function handleAddElement(event) {
    event.preventDefault();
    const cardName = placeElement.value;
    const cardLink = urlElement.value;
    const addCard = {name: cardName, link: cardLink};
    renderCard(addCard);
    event.target.reset();
    const formAddButton = popupAddElement.querySelector('.popup__save-button');
    disableButtonAddElement(formAddButton);
    closePopup(popupAddElement); 
};

//Отключение кнопки добавления элемента
function disableButtonAddElement(button) {
    button.classList.add('popup__save-button_disabled');
    button.disabled = true;
  };

//Заполнение данных профиля
function fillProfileInputs() {
    userNameInput.value = userName.textContent;
    userAboutInput.value = userAbout.textContent;
};

//Открытие попапа редактирования профиля
function openPopupProfileEdit() {
    openPopup(popupEditProfile);
    fillProfileInputs();
};

//Закрытие попапа по клику на оверлей или кнопку закрыть
function closePopupInButtonOrOverlay() {
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => { 
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
                closePopup(popup);
            } 
        })
    })
};

//Закрытие попапа клавишей Esc
function closeKeyEsc(event) {
    if (event.key === "Escape") {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }
  }

//Обработка формы заполнения профиля
function handlePopupAddFormSubmit(event) {
    event.preventDefault(); 
    userName.textContent = userNameInput.value;
    userAbout.textContent = userAboutInput.value;
    closePopup(popupEditProfile);
};

//Открытие попапа
function openPopup(nameOpenedElement) {
    nameOpenedElement.classList.add('popup_opened');
    document.addEventListener('keydown', closeKeyEsc);
}

//Закрытие попапа
function closePopup(nameClosedElement) {
    nameClosedElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeKeyEsc);
}

//Подключение слушателя валидации на разные формы
function checkFormValidation () {
    const formsSelector = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formsSelector.forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
      })
      const newFormValidator = new FormValidator (validationConfig, form);
      newFormValidator.enableValidation();
    })
}


//Тело запуска функций
checkFormValidation();
closePopupInButtonOrOverlay();
popupOpenEditProfileElement.addEventListener('click', openPopupProfileEdit);
profileForm.addEventListener('submit', handlePopupAddFormSubmit);

popupOpenAddElement.addEventListener('click', () => openPopup(popupAddElement));
newElementButton.addEventListener('submit', handleAddElement);
