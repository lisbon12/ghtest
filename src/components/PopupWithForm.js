import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
    this._submitButton = this._popupForm.querySelector('.popup__submit-button');
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
    if (this._submitButton.textContent === 'Сохранить') {
      this._submitButton.textContent = 'Сохранение...'
    } else if (this._submitButton.textContent === 'Создать') {
      this._submitButton.textContent = 'Создание...'
    }
  }

  uploadEffectOff() {
    if (this._submitButton.textContent === 'Сохранение...') {
      this._submitButton.textContent = 'Сохранить'
    } else if (this._submitButton.textContent === 'Создание...') {
      this._submitButton.textContent = 'Создать'
    }
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(inputElement => formValues[inputElement.name] = inputElement.value);
    return formValues;
  }
}
