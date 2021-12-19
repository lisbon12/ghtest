// Импорт css
import './index.css'

// Импорт классов
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

//Импорт переменных
import {
  addCardPopup,
  addCardPopupForm,
  profilePopup,
  profilePopupName,
  profilePopupJob,
  profilePopupForm,
  largeImagePopup,
  profileEditButton,
  addCardButton,
  initialCards,
  validationConfig
} from '../utils/constants.js'

// Создание переменных, содержащих экземпляры класса валидации формы,
// активация этих классов путём вызова публичного метода
const profileFormValidator = new FormValidator(validationConfig, profilePopupForm);
profileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addCardPopupForm);
addCardFormValidator.enableValidation();

// Создание переменной, содержащей экземпляр класса попапа с картинкой,
// навешение слушателей на этот класс
const popupWithImage = new PopupWithImage(largeImagePopup);
popupWithImage.setEventListeners();

// Создание обработчика нажатия на кнопку submit попапа добавления карточки,
// добавляет в вёрстку в место для новых карточек результат действия функции создания новой карточки с параметрами новой карточки
const handleAddCardFormSubmit = (data) => {
  cardList.addItem(createNewCard(data));
}

// Создание переменной, содержащей экземпляр класса попапа для добавления карточки,
// навешение слушателей на этот класс
const newCardPopup = new PopupWithForm(addCardPopup, handleAddCardFormSubmit);
newCardPopup.setEventListeners();

// Навешение на кнопку добавления новой карточки слушателя клика, который откроет попап добавления новой карточки
// и сбрасывает валидацию форм
addCardButton.addEventListener('click', () => {
  newCardPopup.open();
  addCardFormValidator.resetValidation();
});

// Создание переменной, содержащей экземпляр класса с информацией о пользователе,
// в конструктор передаётся объект с селекторами имени профиля и места работы
const userInfo = new UserInfo({userName: '.profile__title', userJob: '.profile__subtitle'});

// Создание обработчика нажатия на кнопку submit попапа редактирования профиля,
// который с помощью публичного метода добавит в текстовые значения селекторов
// имени профиля и места работы, значения, введённые в поля ввода
const handleProfileEditFormSubmit = (data) => {
  userInfo.setUserInfo(data)
};

// Создание переменной, содержащей экземпляр класса попапа для редактирования профиля,
// навешение слушателей на этот класс
const newProfilePopup = new PopupWithForm(profilePopup, handleProfileEditFormSubmit);
newProfilePopup.setEventListeners();

// Навешение на кнопку редактирования профиля слушателя клика, который откроет попап редактирования профиля,
// соберёт текстовые значения, написанные в селекторах имени пользователя и места работы,
// подставит эти значения в поля ввода и сбросит валидацию форм
profileEditButton.addEventListener('click', () => {
  newProfilePopup.open();
  const userInfoData = userInfo.getUserInfo();
  profilePopupName.value = userInfoData.userName;
  profilePopupJob.value = userInfoData.userJob;
  profileFormValidator.resetValidation();
});

// Создание обработчика клика на фотографию карточки, который открывает попап с картинкой
const handleCardClick = ({ link, name }) => {
  popupWithImage.open({ link, name });
}

// Фунция создания новой карточки, которая принимает в себя данные,
// создаёт экземпляр класса карточки, в конструктор которой передаются те же данные,
// что и в функцию создания карточки, а также шаблон из вёрстки для создания новой карточки и обработчик клика на картинику карточки.
// После чего, вызывается публичный метод, в котором карточка собирается из шаблона, в неё подставляются значения и навешиваются слушатели.
// Результатом действия этой функции является готовая карточка.
const createNewCard = (data) => {
  const card = new Card(data, '#card-template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement
}

// Объявление переменной, содержащей экземпляр класса с секцией для размещения карточек.
// В конструктор этого класса передаётся массив данных для создания стандартного набора карточек,
// функция для создания карточек на основе массива данных для создания стандартного набора карточек,
// а также селектора из вёрстки, куда все эти карточки должны быть помещены
const cardList = new Section({
  items: initialCards,
  renderer: createNewCard
}, '.elements');

// Проходим по массиву данных для стандартного набора карточек,
// добавляем в вёрстку в место для новых карточек результат действия функции создания новой карточки с параметрами новой карточки
initialCards.forEach(item => {
  cardList.addItem(createNewCard(item))
});

// Публичный метод класса секции с карточками, применяющий функцию для создания новой карточки к массиву данных со стандартным набором карточек
cardList.renderItems();
