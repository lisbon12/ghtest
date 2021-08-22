let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupContainer = document.querySelector('.popup__container');
let popupSubmitButton = document.querySelector('.popup__submit-button');
let inputName = popupContainer.querySelectorAll('.popup__input')[0];
let inputJob = popupContainer.querySelectorAll('.popup__input')[1];
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);

function formSubmitHandler(event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
}

popupContainer.addEventListener('submit', formSubmitHandler);

popupSubmitButton.addEventListener('click', togglePopup);
