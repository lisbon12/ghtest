export default class Popup {

  constructor(popupSelector) {
    this._popupElement = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Публичный метод, добавляющий селектор открытого попапа и навешивающий возможность закрытия попапа по кнопке Esc
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  // Публичный метод, убирающий селектор открытого попапа и удаляющий слушатель нажатия кнопки Esc
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  // Публичный метод проверяющий, есть ли на цели клика селектор открытого попапа и закрывающий его, в случае если он есть
  setEventListeners(event) {
    this._popupElement.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })
  }

  // Приватный метод, позволяющий вызывать закрытие попапа нажатием кнопки Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }
}
