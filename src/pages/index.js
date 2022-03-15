import './index.css'

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

import {
  addCardPopup,
  addCardPopupForm,
  profilePopup,
  profilePopupName,
  profilePopupJob,
  profilePopupForm,
  largeImagePopup,
  confirmationPopup,
  avatarPopup,
  avatarPopupForm,
  profileEditButton,
  addCardButton,
  userNameField,
  userJobField,
  userAvatarField,
  avatarEditButton,
  validationConfig
} from '../utils/constants.js'

import { data } from 'autoprefixer';

const profileFormValidator = new FormValidator(validationConfig, profilePopupForm);
profileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addCardPopupForm);
addCardFormValidator.enableValidation();
const avatarEditFormValidator = new FormValidator(validationConfig, avatarPopupForm);
avatarEditFormValidator.enableValidation();

const api = new Api({
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort36/cards/',
  userInfoUrl: 'https://nomoreparties.co/v1/cohort36/users/me/',
  userAvatarUrl: 'https://mesto.nomoreparties.co/v1/cohort36/users/me/avatar/',
  headers: {
    authorization: 'e06c5c48-192d-40c5-8786-85ace49aadcc',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo().then((userData) => {
  init(userData);
}).catch((err) => {
  alert(err);
});

const init = (userData) => {
  const userInfo = new UserInfo(userData, userNameField, userJobField, userAvatarField);
  userInfo.setUserInfo(userData);

  const handleProfileEditFormSubmit = (data) => {
    api.editUserInfo(data).then((data) => {
      userInfo.setUserInfo(data);
    }).catch((err) => {
      alert(err);
      }).finally(() => {
        newProfilePopup.uploadEffectOff();
        });
  }

  const handleAvatarEditFormSubmit = (newAvatarUrl) => {
    api.editUserAvatar(newAvatarUrl).then((newAvatarUrl) => {
      userInfo.setUserInfo(newAvatarUrl);
    }).catch((err) => {
      alert(err)
      }).finally(() => {
      avatarEditPopup.uploadEffectOff();
        });
  }

  const newProfilePopup = new PopupWithForm(profilePopup, handleProfileEditFormSubmit);
  newProfilePopup.setEventListeners();

  const avatarEditPopup = new PopupWithForm(avatarPopup, handleAvatarEditFormSubmit);
  avatarEditPopup.setEventListeners();

  profileEditButton.addEventListener('click', () => {
    const userInfoData = userInfo.getUserInfo();
    profilePopupName.value = userInfoData.name;
    profilePopupJob.value = userInfoData.about;
    profileFormValidator.resetValidation();
    newProfilePopup.open();
  });

  avatarEditButton.addEventListener('click', () => {
    avatarEditPopup.open();
    avatarEditFormValidator.resetValidation();
  });
}

const cardsArray = api.getCards();
cardsArray.then((arrayOfCards) => {
  arrayOfCards.reverse().forEach((card) => {
    cardList.addItem(createNewCard(card))
  });
}).catch((err) => {
  alert(err);
});

const popupWithImage = new PopupWithImage(largeImagePopup);
popupWithImage.setEventListeners();

const handleDeleteCardClick = (cardElement, cardId) => {
  popupWithSubmit.open();
  popupWithSubmit.setEventListeners(cardElement, cardId);
}

const handleDeleteCardSubmit = (cardElement, cardId) => {
  api.deleteCard(cardId).then(() => {
    cardElement.remove();
  }).catch((err) => {
    alert(err);
  });
}

const popupWithSubmit = new PopupWithSubmit(confirmationPopup, handleDeleteCardSubmit);

const handleAddCardFormSubmit = (data) => {
  api.postCard(data).then((data) => {
    cardList.addItem(createNewCard(data));
  }).catch((err) => {
      alert(err);
    }).finally(() => {
      newCardPopup.uploadEffectOff();
      });
}

const newCardPopup = new PopupWithForm(addCardPopup, handleAddCardFormSubmit);
newCardPopup.setEventListeners();

addCardButton.addEventListener('click', () => {
  newCardPopup.open();
  addCardFormValidator.resetValidation();
});

const handleCardClick = ({ link, name }) => {
  popupWithImage.open({ link, name });
}

const createNewCard = (data) => {
  const card = new Card(data, '#card-template', handleCardClick, handleDeleteCardClick, api);
  const cardElement = card.createCard();
  return cardElement
}

const cardList = new Section('.elements');
