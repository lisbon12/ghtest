import './index.css'

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-37/cards/',
  userInfoUrl: 'https://nomoreparties.co/v1/cohort-37/users/me/',
  userAvatarUrl: 'https://mesto.nomoreparties.co/v1/cohort-37/users/me/avatar/',
  headers: {
    authorization: '0d42fc8d-987f-4cd6-8e38-433e5816658e',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getCards()])
.then((responses) => {
  const userData = responses[0];
  const cards = responses[1];
  init(userData, cards);
}).catch((err) => {
  alert(err);
});

const init = (userData, cards) => {

  const userId = userData._id;

  const userInfo = new UserInfo(userData, '.profile__title', '.profile__subtitle', '.profile__avatar');
  userInfo.setUserInfo(userData);

  const handleProfileEditFormSubmit = (data) => {
    api.editUserInfo(data).then((data) => {
      userInfo.setUserInfo(data);
    }).catch((err) => {
      alert(err);
      }).finally(() => {
        newProfilePopup.uploadEffectOff();
        newProfilePopup.close();
        });
  }

  const handleAvatarEditFormSubmit = (newAvatarUrl) => {
    api.editUserAvatar(newAvatarUrl).then((newAvatarUrl) => {
      userInfo.setUserInfo(newAvatarUrl);
    }).catch((err) => {
      alert(err)
      }).finally(() => {
        avatarEditPopup.uploadEffectOff();
        avatarEditPopup.close();
        });
  }

  const handleAddCardFormSubmit = (data) => {
    api.postCard(data).then((data) => {
      const newCard = createCard(data);
      cardList.addItem(newCard);
    }).catch((err) => {
        alert(err);
      }).finally(() => {
        newCardPopup.uploadEffectOff();
        newCardPopup.close();
        });
  }

  const handleCardClick = ({ link, name }) => {
    popupWithImage.open({ link, name });
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

  const createCard = (data) => {

      const card = new Card(
        data,
        '#card-template',
        userId,
        handleCardClick,
        (cardId) => {
          popupWithSubmit.open();
          popupWithSubmit.changeSubmitHandler(() => {
            api.deleteCard(cardId).then(() => {
              card.deleteCard();
              popupWithSubmit.close();
            }).catch((err) => {
              alert(err);
            }).finally(() => {
              popupWithSubmit.uploadEffectOff();
              popupWithSubmit.close();
            })
          });
        },
        (cardId) => {
          if (card.isLiked()) {
            api.deleteLike(cardId).then((res) => {
              card.setLikes(res.likes);
            }).catch((err) => {
              alert(err);
            });
          } else {
            api.putLike(cardId).then((res) => {
              card.setLikes(res.likes);
            }).catch((err) => {
              alert(err);
            });
          }
        });
      const cardElement = card.generateCard();
      return cardElement
  }

  const cardList = new Section(cards, createCard, '.elements');
  cardList.renderAllItems();

  const newCardPopup = new PopupWithForm(addCardPopup, handleAddCardFormSubmit);
  newCardPopup.setEventListeners();

  addCardButton.addEventListener('click', () => {
    newCardPopup.open();
    addCardFormValidator.resetValidation();
  });

  const popupWithSubmit = new PopupWithForm(confirmationPopup);
  popupWithSubmit.setEventListeners();

  const popupWithImage = new PopupWithImage(largeImagePopup);
  popupWithImage.setEventListeners();
}
