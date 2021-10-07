import { openLargeImagePopup } from './index.js';

export default class Card {

  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', openLargeImagePopup);
    this._element.querySelector('.element__trash-button').addEventListener('click', this._deleteCard);
    this._element.querySelector('.element__like-button').addEventListener('click', this._toggleLike);
  }

  _deleteCard(event) {
    event.target.closest('.element').remove();
  }

  _toggleLike(event) {
    event.target.classList.toggle('element__like-button_active');
  }

  createCard() {
  this._element = this._getTemplate();
  this._element.querySelector('.element__image').src = this._link;
  this._element.querySelector('.element__image').alt = this._name;
  this._element.querySelector('.element__title').textContent = this._name;

  this._setEventListeners();

  return this._element;
  };

}
