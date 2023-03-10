const popupElement = document.querySelector('.popup');
const popupCloseElement = popupElement.querySelector('.popup__close-button');
const popupOpenElement = document.querySelector('.profile__edit-button');
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
    popupElement.classList.add('popup_opened');
    popupWriteStartedForm();
};

function popupCloseProfileEdit() {
    popupElement.classList.remove('popup_opened');
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

popupOpenElement.addEventListener('click', popupOpenProfileEdit);
popupCloseElement.addEventListener('click', popupCloseProfileEdit);
popupElement.addEventListener('click', popupCloseProfileEditOverlay);
formElement.addEventListener('submit', handleFormSubmit); 