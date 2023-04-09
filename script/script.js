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

const template = document.querySelector('.element__template').content;
const list = document.querySelector('.element__list');

const linkImage = document.querySelector('.popup__link-image');
const nameImage = document.querySelector('.popup__name-image');


initialCards.forEach(addTemplateCard);  

function createCard (initialCards) {
    const htmlElement = template.querySelector('.element__item').cloneNode(true);
    const imageElement = htmlElement.querySelector('.element__image');
    
    htmlElement.querySelector('.element__name').textContent = initialCards.name;
    imageElement.src = initialCards.link;
    imageElement.alt = initialCards.name;
    setEventListener(htmlElement);
    return htmlElement;
};

function addTemplateCard(initialCards) {
  const cardClone = createCard(initialCards);
  list.prepend(cardClone);
};

function handleAddElement(event) {
    event.preventDefault();
    const cardName = placeElement.value;
    const cardLink = urlElement.value;
    addTemplateCard({name: cardName, link: cardLink});
    event.target.reset();
    const formAddButton = popupAddElement.querySelector('.popup__save-button');
    disableButtonAddElement(formAddButton);
};

function disableButtonAddElement(button) {
    button.classList.add('popup__save-button_disabled');
    button.classList.remove('popup__save-button');
    button.removeAttribute('disable', true);
  };

function setEventListener(htmlElement) {
    htmlElement.querySelector('.element__delete-button').addEventListener('click', deleteElement);
    htmlElement.querySelector('.element__like').addEventListener('click', toggleLike);
    htmlElement.querySelector('.element__image').addEventListener('click', openPopupShow);
};

function deleteElement(event) {
    const delElement = event.target.closest('.element__item');
    delElement.remove();
};

function toggleLike(event) {
    const like = event.target;
    like.classList.toggle('element__like_active');
};

function openPopupShow(event) {
    const img = event.target;
    const searchNameElement = event.target.closest('.element__card');
    const nameElement = searchNameElement.querySelector('.element__name');

    linkImage.src = img.src;
    linkImage.alt = img.alt;
    nameImage.textContent = nameElement.textContent;

    openPopup(popupShowElement);
}

function fillProfileInputs() {
    userNameInput.value = userName.textContent;
    userAboutInput.value = userAbout.textContent;
};

function openPopupProfileEdit() {
    openPopup(popupEditProfile);
    fillProfileInputs();
};

function closePopupInButtonOrOverlay() {
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => { 
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
                closePopup(popup);
            } 
        })
    })
    /**if (event.target !== event.currentTarget) {
        return;
    } else {
      closePopup(popupOpened);
    }**/
};

function closeKeyEsc(event) {
    if (event.key === "Escape") {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
      document.removeEventListener('keydown', closeKeyEsc);
    }
  }

function handlePopupAddFormSubmit(event) {
    event.preventDefault(); 
    userName.textContent = userNameInput.value;
    userAbout.textContent = userAboutInput.value;
    closePopup(popupEditProfile);
};

function openPopup(nameOpenedElement) {
    nameOpenedElement.classList.add('popup_opened');
    document.addEventListener('keydown', closeKeyEsc);
}

function closePopup(nameClosedElement) {
    nameClosedElement.classList.remove('popup_opened');
}

closePopupInButtonOrOverlay();
popupOpenEditProfileElement.addEventListener('click', openPopupProfileEdit);
profileForm.addEventListener('submit', handlePopupAddFormSubmit);

popupOpenAddElement.addEventListener('click', () => openPopup(popupAddElement));
newElementButton.addEventListener('submit', handleAddElement);
