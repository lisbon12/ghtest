// Объявляем необходимые переменные
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupProfileInfo = document.querySelector('#popup-profile-info');
let inputName = popupProfileInfo.querySelector('#popup-name');
let inputJob = popupProfileInfo.querySelector('#popup-job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

/* При открытии попапа, значения полей ввода становятся
равными значениям имени и профессии со страницы */
function openPopup() {
  popup.classList.toggle('popup_opened');
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
}

// функция закрывающая попап
function closePopup() {
  popup.classList.toggle('popup_opened');
}

/* Сначала функция получает событие, которое происходит по умолчанию по нажатию кнопки submit,
затем она предотвращает это событие по умолчанию (отправка данных на сервер). Далее присваивает значения
введенные в поля input'ы соответствующим элементам на странице и закрывает попап */
function formSubmitHandler(event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup();
}

// слушатели кликов кнопок редактирования профиля и закрытия, вызывающие соответствующие функции
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

// Добавляем к попап-форме слушателя события submit и запускаем функцию
popupProfileInfo.addEventListener('submit', formSubmitHandler);
