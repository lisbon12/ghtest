import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
  }

  // Публичный метод открытия попапа с большой картинкой, добавляющий при открытии нужные атрибуты
  open({ link, name }) {
    this._popupElement.querySelector('.popup__subtitle').textContent = name;
    const imageElement = this._popupElement.querySelector('.popup__large-image');
    imageElement.src = link;
    imageElement.alt = name;
    super.open();
  }
}
