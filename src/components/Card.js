import { data } from "autoprefixer";

export default class Card {

  constructor({link, name, owner, _id, likes}, cardSelector, userId, handleCardClick, handleDeleteCardClick, handleLikeClick) {
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
    this._owner = owner._id;
    this._cardId = _id;
    this._likes = likes;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
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
      this._handleDeleteCardClick(this._cardId);
    });
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
    });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    const cardLikedByUser = this._likes.find(user => user._id === this._userId);
    return cardLikedByUser
  }

  _putLikeIcon() {
    this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
  }

  _putUnlikeIcon() {
    this._element.querySelector('.element__like-button').classList.remove('element__like-button_active');
  }

  setLikes(cardLikes) {
    this._likes = cardLikes;
    const likeCounter = this._element.querySelector('.element__like-counter');
    likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._putLikeIcon();
    } else if (!this.isLiked()) {
      this._putUnlikeIcon();
    }
  }

  createCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this.setLikes(this._likes);
    this._setEventListeners();

    if (this._owner !== this._userId) {
      this._element.querySelector('.element__trash-button').remove();
    }

    return this._element;
  };
}
