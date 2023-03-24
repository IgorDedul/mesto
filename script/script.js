const popupElement = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddElement = document.querySelector('.popup__add-element');
const popupShowElement = document.querySelector('.popup_image');

const popupCloseElement = document.querySelector('.popup__close-button');
const popupCloseAddElement = document.querySelector('.popup__close-add-button');
const popupOpenEditProfileElement = document.querySelector('.profile__edit-button');
const popupOpenAddElement = document.querySelector('.profile__add-button');
const popupCloseImage = document.querySelector('.popup__close-image-button');

const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__subtitle');
const userNameInput = document.getElementById('name-input');
const userAboutInput = document.getElementById('about-input');
const formElement = document.querySelector('.popup__input-list');
const placeElement = document.getElementById('place-input');
const urlElement = document.getElementById('url-input');
const newElementButton = document.querySelector('.popup__element-list');

const template = document.querySelector('.element__template').content;
const list = document.querySelector('.element__list');


const initialCards = [
    {
      name: 'Париж',
      link: './images/1.jpg'
    },
    {
      name: 'Будапешт',
      link: './images/2.jpg'
    },
    {
      name: 'Брюссель',
      link: './images/3.jpg'
    },
    {
      name: 'Амстердам',
      link: './images/4.jpg'
    },
    {
      name: 'Барселона',
      link: './images/5.jpg'
    },
    {
      name: 'Верона',
      link: './images/6.jpg'
    }
  ]; 

initialCards.forEach(renderElement);  

function renderElement (initialCards) {
    const htmlElement = template.cloneNode(true);
    htmlElement.querySelector('.element__name').textContent = initialCards.name;
    htmlElement.querySelector('.element__image').src = initialCards.link;
    setEventListener(htmlElement);
    list.append(htmlElement);
};

function getAddElement() {
    const htmlElement = template.cloneNode(true);
    htmlElement.querySelector('.element__name').textContent = placeElement.value;
    htmlElement.querySelector('.element__image').src = urlElement.value;
    list.prepend(htmlElement);    
};

function setEventListener(htmlElement) {
    htmlElement.querySelector('.element__delete-button').addEventListener('click', getDeleteElement);
    htmlElement.querySelector('.element__like').addEventListener('click', getLiked);
    htmlElement.querySelector('.element__image').addEventListener('click', openPopupShow);
};

function getDeleteElement(event) {
    const delElement = event.target.closest('.element__item');
    delElement.remove();
};

function getLiked(event) {
    const like = event.target;
    like.classList.toggle('element__like_active');
};

function openPopupShow(event) {
    const img = event.target;
    const searchNameElement = event.target.closest('.element__card');
    const nameElement = searchNameElement.querySelector('.element__name');

    document.querySelector('.popup__link-image').src = img.src;
    document.querySelector('.popup__name-image').textContent = nameElement.textContent;

    popupShowElement.classList.add('popup_opened');
    popupCloseImage.addEventListener('click', popupCloseImageShow);
}

function popupCloseImageShow() {
    popupShowElement.classList.remove('popup_opened');
};

function popupWriteStartedForm() {
    userNameInput.value = userName.textContent;
    userAboutInput.value = userAbout.textContent;
};

function popupOpenProfileEdit() {
    popupEditProfile.classList.add('popup_opened');
    popupWriteStartedForm();
};

function popupCloseProfileEdit() {
    popupEditProfile.classList.remove('popup_opened');
};

function popupCloseProfileEditOverlay(event) {
    if (event.target !== event.currentTarget) {
        return;
    } else {
        popupCloseProfileEdit();
    }
};

function handleFormSubmit(event) {
    event.preventDefault(); 
    userName.textContent = userNameInput.value;
    userAbout.textContent = userAboutInput.value;
    popupCloseProfileEdit();
};

function popupOpenAdd() {
    popupAddElement.classList.add('popup_opened');
  };

function popupCloseAdd() {
    popupAddElement.classList.remove('popup_opened');
};

popupOpenEditProfileElement.addEventListener('click', popupOpenProfileEdit);
popupCloseElement.addEventListener('click', popupCloseProfileEdit);
popupElement.addEventListener('click', popupCloseProfileEditOverlay);
formElement.addEventListener('submit', handleFormSubmit);

popupOpenAddElement.addEventListener('click', popupOpenAdd);
newElementButton.addEventListener('submit', getAddElement);
popupCloseAddElement.addEventListener('click', popupCloseAdd);