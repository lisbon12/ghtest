export default class FormValidator {

  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
  }

  _showInputError = (inputElement, errorElement) => {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  _hasNotInputValues = () => {
    return this._inputList.every(inputElement => {
      return inputElement.value.length === 0;
    });
  };

  _disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput() || this._hasNotInputValues()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    };
  };

  _setEventListeners = () => {
    this._formSelector.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
      this._setEventListeners();
      this._toggleButtonState();
  };

  resetValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    })
  }
}
