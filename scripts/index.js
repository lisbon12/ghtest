// Импорт модулей
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import FormValidator from './FormValidator.js';

// Попап добавления карточки
const addCardPopup = document.querySelector('#popup-add-card');
const addCardPopupPlace = addCardPopup.querySelector('#input-place');
const addCardPopupLink = addCardPopup.querySelector('#input-link');
const addCardPopupCloseButton = addCardPopup.querySelector('#add-card-popup-close-button');
const addCardPopupForm = addCardPopup.querySelector('#add-card');

// Попап редактирования профиля
const profilePopup = document.querySelector('#popup-profile');
const profilePopupName = profilePopup.querySelector('#user-name');
const profilePopupJob = profilePopup.querySelector('#user-job');
const profilePopupCloseButton = profilePopup.querySelector('#profile-popup-close-button');
const profilePopupForm = profilePopup.querySelector('#profile-edit');

// Попап с большой картинкой
const largeImagePopup = document.querySelector('.popup_type_large-image');
const largeImage = largeImagePopup.querySelector('.popup__large-image');
const largeImagePopupTitle = largeImagePopup.querySelector('.popup__subtitle');
const largeImagePopupCloseButton = largeImagePopup.querySelector('#large-image-popup-close-button');

// Поля для ввода значений из попапа профиля
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Переменная, содержащая DOM-элемент, куда вставляются карточки
// const cardList = document.querySelector('.elements');

//Карточки по умолчанию при загрузке страницы
const initialCards = [
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
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Создаём переменные, содержащие экземпляры класса валидации формы
const profileFormValidator = new FormValidator(validationConfig, profilePopupForm);
const addCardFormValidator = new FormValidator(validationConfig, addCardPopupForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(largeImagePopup);
popupWithImage.setEventListeners();

const handleFormSubmit = (data) => {
  cardList.addItem(createNewCard(data));
}

const newCardPopup = new PopupWithForm(addCardPopup, handleFormSubmit);
newCardPopup.setEventListeners();

addCardButton.addEventListener('click', function() {
  newCardPopup.open();
  addCardFormValidator.resetValidation();
});

const handleCardClick = ({ link, name }) => {
  popupWithImage.open({ link, name });
}

const createNewCard = (data) => {
  const card = new Card(data, '#card-template', handleCardClick);
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
}

const cardList = new Section({
  items: initialCards,
  renderer: createNewCard
}, '.elements');

cardList.renderItems();

// Функция, отрисовывающая карточку на странице
// function renderCard(card) {
//   cardList.prepend(card);
// }

/* Методом forEach перебираем все элементы массива с карточками по умолчанию
и к каждому элементу массива применяем публичный метод класса Card, отрисовывающий созданную карточку */
// initialCards.forEach(function (data) {
//   const card = new Card(data, '#card-template');
//   renderCard(card.createCard());
// });

/* Отдельная функция для открытия попапа профиля в связи с тем,
что необходимо подставить определенные данные, сразу при открытии,
а также провалидировать их */
// function openProfilePopup() {
//   profilePopupName.value = userName.textContent;
//   profilePopupJob.value = userJob.textContent;
//   openPopup(profilePopup);
//   profileFormValidator.resetValidation();
// }

// function openLargeImagePopup(event) {
//   largeImage.src = event.target.src;
//   largeImage.alt = event.target.closest('.element').querySelector('.element__title').textContent;
//   largeImagePopupTitle.textContent = event.target.closest('.element').querySelector('.element__title').textContent;
//   openPopup(largeImagePopup);
// }

// Функция сабмита формы профиля
// function submitProfileForm(event) {
//   event.preventDefault();
//   userName.textContent = profilePopupName.value;
//   userJob.textContent = profilePopupJob.value;
//   closePopup(profilePopup);
// }

// Функция сабмита формы добавления карточки
// function submitAddCardForm(event) {
//   event.preventDefault();
//   const card = new Card({name: addCardPopupPlace.value, link: addCardPopupLink.value}, '#card-template');
//   renderCard(card.createCard());
//   closePopup(addCardPopup);
//   addCardPopupPlace.value = '';
//   addCardPopupLink.value = '';
//   addCardFormValidator.resetValidation();
// }

// Функция открытия попапа и навешение слушателя закрытия на Escape
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', pressEsc);
// }

// Функция закрытия попапа и снятие слушателя закрытия на Escape
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', pressEsc);
// }

// Функция, при вызове которой, закрыть попап можно по нажатию Escape
// function pressEsc(event) {
//   if (event.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// Функция, при вызове которой, закрыть попап можно по клику на пространство вне попап-контейнера
// function closePopupByClick(event) {
//   if (event.target.classList.contains('popup_opened')) {
//     closePopup(event.target);
//   }
// }

// Слушатели кнопок попапа профиля
// profileEditButton.addEventListener('click', openProfilePopup);
// profilePopupCloseButton.addEventListener('click', function() {
//   closePopup(profilePopup);
// });
// profilePopupForm.addEventListener('submit', submitProfileForm);
// profilePopup.addEventListener('mousedown', closePopupByClick);

// // Слушатели кнопок попапа добавления карточки
// addCardButton.addEventListener('click', function() {
//   openPopup(addCardPopup);
// });
// addCardPopupCloseButton.addEventListener('click', function() {
//   closePopup(addCardPopup);
// });
// addCardPopupForm.addEventListener('submit', submitAddCardForm);
// addCardPopup.addEventListener('mousedown', closePopupByClick);

// // Слушатели кнопок попапа большой картинки
// largeImagePopupCloseButton.addEventListener('click', function() {
//   closePopup(largeImagePopup);
// });
// largeImagePopup.addEventListener('mousedown', closePopupByClick);
