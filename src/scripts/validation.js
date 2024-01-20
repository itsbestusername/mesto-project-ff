import {validationConfig} from "./index.js"
export {
  enableValidation,
  clearValidation
};

const showError = (elementForm, inputElement, errorMessage) => {
  const formError = elementForm.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("form__input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("form__input-error_active");
};

const hideError = (elementForm, inputElement) => {
  const formError = elementForm.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  // 1. Удалите активный класс ошибки c formError.
  // 2. Очистите свойство textContent элемента formError.
  formError.classList.remove("form__input-error_active");
  formError.textContent = "";
};

const checkInputValidity = (elementForm, inputElement) => {
  if (inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); 
  } else { 
    inputElement.setCustomValidity(""); 
  } 
 if (!inputElement.validity.valid) { 
  showError(elementForm, inputElement, inputElement.validationMessage); 
} else { 
  hideError(elementForm, inputElement); 
}
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function changeButtonState(inputList, buttonSubmit) {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(validationConfig.inactiveButtonClass);
    buttonSubmit.setAttribute("disabled", true);
  } else {
    buttonSubmit.classList.remove(validationConfig.inactiveButtonClass);
    buttonSubmit.removeAttribute("disabled", true);
  }
}

function addListeners(elementForm) {
  const inputList = Array.from(elementForm.querySelectorAll(validationConfig.inputSelector));
  const buttonSubmit = elementForm.querySelector(validationConfig.submitButtonSelector);

  changeButtonState(inputList, buttonSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(elementForm, inputElement);
      changeButtonState(inputList, buttonSubmit);
    });
  });
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((elementForm) => {
    elementForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    addListeners(elementForm);
  });
}

function clearValidation(elementForm) {
  const inputList = Array.from(
    elementForm.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonSubmit = elementForm.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideError(elementForm, inputElement);
    inputElement.setCustomValidity("");
  });
  elementForm.reset();
  changeButtonState(inputList, buttonSubmit);
}
