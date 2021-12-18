// Попап добавления карточки
export const addCardPopup = document.querySelector('#popup-add-card');
export const addCardPopupForm = addCardPopup.querySelector('#add-card');

// Попап редактирования профиля
export const profilePopup = document.querySelector('#popup-profile');
export const profilePopupName = profilePopup.querySelector('#user-name');
export const profilePopupJob = profilePopup.querySelector('#user-job');
export const profilePopupForm = profilePopup.querySelector('#profile-edit');

// Попап с большой картинкой
export const largeImagePopup = document.querySelector('.popup_type_large-image');

// Кнопки
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');

//Карточки по умолчанию при загрузке страницы
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Конфигурация классов и селекторов для валидации
export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
