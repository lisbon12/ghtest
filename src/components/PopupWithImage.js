import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupCardImage = this._popupElement.querySelector('.popup__large-image');
    this._captionImage = this._popupElement.querySelector('.popup__subtitle');
  }

  // Публичный метод открытия попапа с большой картинкой, добавляющий при открытии нужные атрибуты
  open({ link, name }) {
    this._popupCardImage.src = link;
    this._popupCardImage.alt = name;
    this._captionImage.textContent = name;
    super.open();
  }
}
