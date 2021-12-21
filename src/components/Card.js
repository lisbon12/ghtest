export default class Card {

  constructor({ link, name }, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick({link: this._link, name: this._name});
    });
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
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  };
}
