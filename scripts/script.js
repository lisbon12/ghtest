const popupLargeImage = document.querySelector('.popup_type_large-image');
const largeImage = popupLargeImage.querySelector('.popup__large-image');
const popupCloseButton = popupLargeImage.querySelector('.popup__close-button').addEventListener('click', function() {
  togglePopup(popupLargeImage);
});
const popupLargeImageTitle = popupLargeImage.querySelector('.popup__subtitle');

// Поля для ввода значений из попапа профиля
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// создаем шаблон карточки, готовый к принятию значений по умолчанию
const cardList = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

//создаем шаблон попапа, готовый к принятию значений
const page = document.querySelector('.page');
const popupTemplate = document.querySelector('#popup-template').content;

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
4. Отображает на странице шаблон с полученными данными. */
function addCard(data) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__image').src = data.link;
  cardElement.querySelector('.element__image').alt = 'Фото не отобразилось';
  cardElement.querySelector('.element__image').addEventListener('click', function(event) {
    largeImage.src = event.target.src;
    popupLargeImageTitle.textContent = event.target.closest('.element').querySelector('.element__title').textContent;
    togglePopup(popupLargeImage);
  });
  cardElement.querySelector('.element__title').textContent = data.name;
  cardElement.querySelector('.element__trash-button').addEventListener('click', function(event) {
    event.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active');
  });

  cardList.prepend(cardElement);
};

/* Методом forEach перебираем все элементы массива с карточками по умолчанию
и к каждому элементу массива применяем функцию, для взятия данных из массива */
initialCards.forEach(function (data) {
  addCard(data);
});

function profilePopup() {
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  const popupCloseButton = popup.querySelector('.popup__close-button');
  const popupProfileSubmit = popup.querySelector('#form');
  const popupName = popup.querySelector('#input-1');
  const popupJob = popup.querySelector('#input-2');

  popup.querySelector('.popup__title').textContent = 'Редактировать профиль'
  popupProfileSubmit.name = 'form-profile';
  popupName.name = 'user-name';
  popupName.placeholder = 'Ваше имя'
  popupName.value = userName.textContent;
  popupJob.name = 'user-job';
  popupJob.placeholder = 'Чем занимаетесь?';
  popupJob.value = userJob.textContent;
  popup.querySelector('.popup__submit-button').textContent = 'Сохранить';

  popupCloseButton.addEventListener('click', function() {
    togglePopup(popup);
  });

  popupProfileSubmit.addEventListener('submit', function(event) {
    event.preventDefault();
    userName.textContent = popupName.value;
    userJob.textContent = popupJob.value;
    togglePopup(popup);
  });

  togglePopup(popup);

  page.append(popup);
}

function addCardPopup() {
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  const popupCloseButton = popup.querySelector('.popup__close-button');
  const popupAddCardSubmit = popup.querySelector('#form');
  const popupCardName = popup.querySelector('#input-1');
  const popupCardLink = popup.querySelector('#input-2');

  popup.querySelector('.popup__title').textContent = 'Новое место'
  popupAddCardSubmit.name = 'form-add-card';
  popupCardName.name = 'card-name';
  popupCardName.placeholder = 'Наименование места'
  popupCardLink.name = 'card-link';
  popupCardLink.placeholder = 'Вставьте ссылку на фотографию';
  popup.querySelector('.popup__submit-button').textContent = 'Создать';

  popupCloseButton.addEventListener('click', function() {
    togglePopup(popup);
  });

  popupAddCardSubmit.addEventListener('submit', function(event) {
    event.preventDefault();
    addCard({name: popupCardName.value, link: popupCardLink.value});
    togglePopup(popup);
  });

  togglePopup(popup);

  page.append(popup);
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', profilePopup);
addCardButton.addEventListener('click', addCardPopup);
