import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.uploadEffectOn();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  uploadEffectOn() {
    if (this._popupForm.querySelector('.popup__submit-button').textContent === 'Сохранить') {
      this._popupForm.querySelector('.popup__submit-button').textContent = 'Сохранение...'
    } else if (this._popupForm.querySelector('.popup__submit-button').textContent === 'Создать') {
      this._popupForm.querySelector('.popup__submit-button').textContent = 'Создание...'
    }
  }

  uploadEffectOff() {
    if (this._popupForm.querySelector('.popup__submit-button').textContent === 'Сохранение...') {
      this._popupForm.querySelector('.popup__submit-button').textContent = 'Сохранить'
    } else if (this._popupForm.querySelector('.popup__submit-button').textContent === 'Создание...') {
      this._popupForm.querySelector('.popup__submit-button').textContent = 'Создать'
    }
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(inputElement => formValues[inputElement.name] = inputElement.value);
    return formValues;
  }
}
