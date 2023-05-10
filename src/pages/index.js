import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../components/initialCards.js'

//Константы на открытие попапов
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');

//Константы кнопок открытия попапов
const popupOpenEditProfileElement = document.querySelector('.profile__edit-button');
const popupOpenAddElement = document.querySelector('.profile__add-button');

//Константы попапа профиля
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
const list = document.querySelector('.element__list');

// Константы классов необходимые для открытия картинки
const linkImage = document.querySelector('.popup__link-image');
const nameImage = document.querySelector('.popup__name-image');
const popupShowElement = document.querySelector('.popup_image');


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
function renderCard(item) {
    const compliteCard = createdCard(item);
    list.prepend(compliteCard);
} 

//Функция создания карты с установленными обработчиками
function createdCard(item) {
    const card = new Card (item, templateSelector, handleCardClick);
    const newElementCard = card.createCard();
    return newElementCard;
}

//Добавление нового элемента
function handleAddElement(event) {
    event.preventDefault();
    const cardName = placeElement.value;
    const cardLink = urlElement.value;
    const addCard = {name: cardName, link: cardLink};
    renderCard(addCard);
    event.target.reset();
    popupAddElementFormValidator.resetValidation();
    closePopup(popupAddElement); 
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

//Обработчик открытия попапа изображения
function handleCardClick(name, link) {
    linkImage.src = link;
    linkImage.alt = name;
    nameImage.textContent = name;
    openPopup(popupShowElement);
}

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

//Включение валидации для каждой из форм отдельно
    //Валидация формы профиля
    const popupEditProfileFormValidator = new FormValidator (validationConfig, popupEditProfile);
    popupEditProfileFormValidator.resetValidation();
    popupEditProfileFormValidator.enableValidation();
    //Валидация формы добавления нового элемента
    const popupAddElementFormValidator = new FormValidator (validationConfig, popupAddElement);
    popupAddElementFormValidator.resetValidation();
    popupAddElementFormValidator.enableValidation();


//Тело запуска функций
closePopupInButtonOrOverlay();
popupOpenEditProfileElement.addEventListener('click', openPopupProfileEdit);
profileForm.addEventListener('submit', handlePopupAddFormSubmit);

popupOpenAddElement.addEventListener('click', () => openPopup(popupAddElement));
newElementButton.addEventListener('submit', handleAddElement);