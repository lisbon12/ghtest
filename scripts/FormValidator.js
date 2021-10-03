export default class FormValidator {

  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    console.log(this._inputSelector);
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

  _checkInputValidity = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
      showInputError(inputElement, errorElement, this._inputErrorClass, this._errorClass);
    } else {
      hideInputError(inputElement, errorElement, this._inputErrorClass, this._errorClass);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  _hasNotInputValues = (inputList) => {
    return inputList.every(inputElement => {
      return inputElement.value.length === 0;
    });
  };

  _disableSubmitButton = (buttonElement) => {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  };

  _enableSubmitButton = (buttonElement) => {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  };

  _toggleButtonState = (formElement, inputList) => {
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    if (hasInvalidInput(inputList) || hasNotInputValues(inputList)) {
      disableSubmitButton(buttonElement, this._inactiveButtonClass);
    } else {
      enableSubmitButton(buttonElement, this._inactiveButtonClass);
    };
  };

  _setEventListeners = (formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, this._inputErrorClass, this._errorClass);
        toggleButtonState(formElement, inputList, this._submitButtonSelector, this._inactiveButtonClass);
      });
    });

    toggleButtonState(formElement, inputList, this._submitButtonSelector, this._inactiveButtonClass);
  };

  enableValidation = () => {
    const formList = document.querySelectorAll(this._formSelector);
    formList.forEach(formElement => {
      console.log(this._inputSelector);
      setEventListeners(formElement, this._inputSelector, this._submitButtonSelector, this._inputErrorClass, this._errorClass, this._inactiveButtonClass);
    });
  };
}
