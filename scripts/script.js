// Объявляем необходимые переменные
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupProfileInfo = document.querySelector('#popup-profile-info');
const inputName = popupProfileInfo.querySelector('#popup-name');
const inputJob = popupProfileInfo.querySelector('#popup-job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

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
4. Отображает на странице шаблон с полученными данными. */
function addCard(data) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__image').src = data.link;
  cardElement.querySelector('.element__image').alt = 'Фото не отобразилось';
  cardElement.querySelector('.element__title').textContent = data.name;

  cardList.append(cardElement);
};

/* Методом forEach перебираем все элементы массива с карточками по умолчанию
и к каждому элементу массива применяем функцию, для взятия данных из массива */
initialCards.forEach(function (data) {
  addCard(data);
});

// функция открываюшая попап
function openPopup() {
  popup.classList.toggle('popup_opened');
}

// функция закрывающая попап
function closePopup() {
  popup.classList.toggle('popup_opened');
}

/* функция добавляющая значения по умолчанию в поля для ввода и
открывающая попап редактирования профиля */
function openProfilePopup() {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
  openPopup();
}

/* Сначала функция получает событие, которое происходит по умолчанию по нажатию кнопки submit,
затем она предотвращает это событие по умолчанию (отправка данных на сервер). Далее присваивает значения
введенные в поля input'ы соответствующим элементам на странице и закрывает попап */
function ProfileSubmitHandler(event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup();
}

// слушатель клика по кнопке закрытия попапа
popupCloseButton.addEventListener('click', closePopup);

// слушатель клика кнопки открытия попапа редактирования профиля
profileEditButton.addEventListener('click', openProfilePopup);

// слушатель клика кнопки отправки данных в попапе редактирования профиля
popupProfileInfo.addEventListener('submit', ProfileSubmitHandler);
