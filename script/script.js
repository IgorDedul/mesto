const popupElement = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddElement = document.querySelector('.popup__add-element');

const popupCloseElement = document.querySelector('.popup__close-button');
const popupCloseAddElement = document.querySelector('.popup__close-add-button');
const popupOpenEditProfileElement = document.querySelector('.profile__edit-button');
const popupOpenAddElement = document.querySelector('.profile__add-button');

const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__subtitle');
const userNameInput = document.getElementById('name-input');
const userAboutInput = document.getElementById('about-input');
const formElement = document.querySelector('.popup__input-list');


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
popupCloseAddElement.addEventListener('click', popupCloseAdd);