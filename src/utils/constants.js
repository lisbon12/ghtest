// Попап добавления карточки
export const addCardPopup = document.querySelector('#popup-add-card');
export const addCardPopupForm = addCardPopup.querySelector('#add-card');

// Попап редактирования профиля
export const profilePopup = document.querySelector('#popup-profile');
export const profilePopupName = profilePopup.querySelector('#name');
export const profilePopupJob = profilePopup.querySelector('#about');
export const profilePopupForm = profilePopup.querySelector('#profile-edit');

// Попап с большой картинкой
export const largeImagePopup = document.querySelector('.popup_type_large-image');

//Попап подтверждения
export const confirmationPopup = document.querySelector('#popup-confirm');

//Попап редактирования аватара
export const avatarPopup = document.querySelector('#popup-avatar-edit');
export const avatarPopupForm = avatarPopup.querySelector('#avatar-edit');

// Кнопки
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');

// Информация о профиле
export const userNameField = document.querySelector('.profile__title');
export const userJobField = document.querySelector('.profile__subtitle');
export const userAvatarField = document.querySelector('.profile__avatar');

// Конфигурация классов и селекторов для валидации
export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
