// Попап добавления карточки
const addCardPopup = document.querySelector('#popup-add-card');
const addCardContainer = addCardPopup.querySelector('#add-card-container');
const addCardPopupPlace = addCardPopup.querySelector('#input-place');
const addCardPopupLink = addCardPopup.querySelector('#input-link');
const addCardPopupCloseButton = addCardPopup.querySelector('#add-card-popup-close-button');
const addCardPopupSubmit = addCardPopup.querySelector('#add-card');

// Попап редактирования профиля
const profilePopup = document.querySelector('#popup-profile');
const profileContainer = profilePopup.querySelector('#profile-container');
const profilePopupName = profilePopup.querySelector('#user-name');
const profilePopupJob = profilePopup.querySelector('#user-job');
const profilePopupCloseButton = profilePopup.querySelector('#profile-popup-close-button');
const profilePopupSubmit = profilePopup.querySelector('#profile-edit');

// Попап с большой картинкой
const largeImagePopup = document.querySelector('.popup_type_large-image');
const largeImageContainer = largeImagePopup.querySelector('#large-image-container');
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
  const elementImage = cardElement.querySelector('.element__image');

  elementImage.src = data.link;
  elementImage.alt = data.name;
  elementImage.addEventListener('click', function(event) {
    largeImage.src = data.link;
    largeImage.alt = data.name;
    largeImagePopupTitle.textContent = data.name;
    openPopup(largeImagePopup);
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
что необходимо подставить определенные данные, сразу при открытии,
а также провалидировать их */
function openProfilePopup() {
  profilePopupName.value = userName.textContent;
  profilePopupJob.value = userJob.textContent;
  openPopup(profilePopup);
}

// Функция открытия попапа и навешение слушателя закрытия на Escape
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc);
}

// Функция закрытия попапа и снятие слушателя закрытия на Escape
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEsc);
}

// Функция, при вызове которой, закрыть попап можно по нажатию Escape
function pressEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupByClick(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
}

// Слушатели кнопок попапа профиля
profileEditButton.addEventListener('click', openProfilePopup);
profilePopupCloseButton.addEventListener('click', function() {
  closePopup(profilePopup);
});
profilePopupSubmit.addEventListener('submit', function(event) {
  event.preventDefault();
  userName.textContent = profilePopupName.value;
  userJob.textContent = profilePopupJob.value;
  closePopup(profilePopup);
});
profilePopup.addEventListener('mousedown', closePopupByClick);

// Слушатели кнопок попапа добавления карточки
addCardButton.addEventListener('click', function() {
  openPopup(addCardPopup);
});
addCardPopupCloseButton.addEventListener('click', function() {
  closePopup(addCardPopup);
});
addCardPopupSubmit.addEventListener('submit', function(event) {
  event.preventDefault();
  const card = createCard({name: addCardPopupPlace.value, link: addCardPopupLink.value});
  renderCard(card);
  closePopup(addCardPopup);
});
addCardPopup.addEventListener('mousedown', closePopupByClick);

// Слушатели кнопок попапа большой картинки
largeImagePopupCloseButton.addEventListener('click', function() {
  closePopup(largeImagePopup);
});
largeImagePopup.addEventListener('mousedown', closePopupByClick);
