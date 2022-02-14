import { data } from "autoprefixer";

export default class Card {

  constructor({link, name, owner, _id, likes}, cardSelector, handleCardClick, handleDeleteCardClick, api) {
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
    this._owner = owner._id;
    this._cardId = _id;
    this._likes = likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._api = api;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick({link: this._link, name: this._name});
    });
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._handleDeleteCardClick(this._element, this._cardId);
    });
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._toggleLike(event);
    });
  }

  _toggleLike(event) {
    if (!event.target.classList.contains('element__like-button_active')) {
      this._api.putLike(this._cardId).then(() => {
        event.target.classList.add('element__like-button_active');
        this._element.querySelector('.element__like-counter').textContent = this._likes.length += 1;
      }).catch((err) => {
        alert(err);
      });
    } else {
      this._api.deleteLike(this._cardId).then(() => {
        event.target.classList.remove('element__like-button_active');
        this._element.querySelector('.element__like-counter').textContent = this._likes.length -= 1;
      }).catch((err) => {
        alert(err);
      });
    }
  }

  createCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__like-counter').textContent = this._likes.length;
    this._setEventListeners();

    if (this._owner !== 'd20fb9eb06bc2fed083fe74b') {
      this._element.querySelector('.element__trash-button').remove();
    }

    if (this._likes.length > 0) {
      for (let i = 0; i < this._likes.length; i++) {
        if (this._likes[i]._id === 'd20fb9eb06bc2fed083fe74b') {
          this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
        }
      }
    }
    return this._element;
  };
}
