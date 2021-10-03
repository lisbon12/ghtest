import { largeImage, largeImagePopupTitle, largeImagePopup, openPopup } from './index.js';

export default class Card {

  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
  }

  createCard() {
  const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');

  elementImage.src = this._link;
  elementImage.alt = this._name;
  elementImage.addEventListener('click', function() {
    largeImage.src = this._link;
    largeImage.alt = this._name;
    largeImagePopupTitle.textContent = this._name;
    openPopup(largeImagePopup);
  }.bind(this));
  cardElement.querySelector('.element__title').textContent = this._name;
  cardElement.querySelector('.element__trash-button').addEventListener('click', function() {
    cardElement.remove();
  });
  cardElement.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active');
  });

  return cardElement;
  };

}
