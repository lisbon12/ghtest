// Попап добавления карточки
const addCardPopup = document.querySelector('#popup-add-card');
const addCardPopupPlace = addCardPopup.querySelector('#input-place');
const addCardPopupLink = addCardPopup.querySelector('#input-link');
const addCardPopupCloseButton = addCardPopup.querySelector('#add-card-popup-close-button');
const addCardPopupSubmit = addCardPopup.querySelector('#add-card');

// Попап редактирования профиля
const profilePopup = document.querySelector('#popup-profile');
const profilePopupName = profilePopup.querySelector('#user-name');
const profilePopupJob = profilePopup.querySelector('#user-job');
const profilePopupCloseButton = profilePopup.querySelector('#profile-popup-close-button');
const profilePopupSubmit = profilePopup.querySelector('#profile-edit');

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

// создаем шаблон карточки, готовый к принятию значений по умолчанию
const cardList = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

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

/* Действие функции:
1. Принимает на вход данные из массива;
2. Создает шаблон карточки;
3. Подставляет взятые из массива данные в определенные места в шаблоне;
5. Удаляет карточку по клику на кнопку корзинки;
6. Меняет цвет кнопки лайка по нажатию;
7. Открывает попап с большой картинкой. */
function createCard(data) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__image').src = data.link;
  cardElement.querySelector('.element__image').alt = data.name;
  cardElement.querySelector('.element__image').addEventListener('click', function(event) {
    largeImage.src = event.target.src;
    largeImage.alt = event.target.alt;
    largeImagePopupTitle.textContent = data.name;
    togglePopup(largeImagePopup);
  });
  cardElement.querySelector('.element__title').textContent = data.name;
  cardElement.querySelector('.element__trash-button').addEventListener('click', function() {
    cardElement.remove();
  });
  cardElement.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active');
  });

  return cardElement;
};

// Функция, отрисовывающая карточку на странице
function renderCard(card) {
  cardList.prepend(card);
}

/* Методом forEach перебираем все элементы массива с карточками по умолчанию
и к каждому элементу массива применяем функцию, отрисовывающую созданную карточку */
initialCards.forEach(function (data) {
  renderCard(createCard(data));
});

/* Отдельная функция для открытия попапа профиля в связи с тем,
что необходимо подставить определенные данные, сразу при открытии */
function openProfilePopup() {
  profilePopupName.value = userName.textContent;
  profilePopupJob.value = userJob.textContent;
  togglePopup(profilePopup);
}

// Функция открытия и закрытия попапа
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Слушатели кнопок
profileEditButton.addEventListener('click', openProfilePopup);
profilePopupCloseButton.addEventListener('click', function() {
  togglePopup(profilePopup);
});
profilePopupSubmit.addEventListener('submit', function(event) {
  event.preventDefault();
  userName.textContent = profilePopupName.value;
  userJob.textContent = profilePopupJob.value;
  togglePopup(profilePopup);
});
addCardButton.addEventListener('click', function() {
  togglePopup(addCardPopup);
});
addCardPopupCloseButton.addEventListener('click', function() {
  togglePopup(addCardPopup);
});
addCardPopupSubmit.addEventListener('submit', function(event) {
  event.preventDefault();
  const card = createCard({name: addCardPopupPlace.value, link: addCardPopupLink.value});
  renderCard(card);
  togglePopup(addCardPopup);
});
largeImagePopupCloseButton.addEventListener('click', function() {
  togglePopup(largeImagePopup);
});
