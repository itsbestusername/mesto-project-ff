export { enableValidation, clearValidation };

const showError = (elementForm, inputElement, errorMessage, obj) => {
  const formError = elementForm.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(obj.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(obj.errorClass);
};

const hideError = (elementForm, inputElement, obj) => {
  const formError = elementForm.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  // 1. Удалите активный класс ошибки c formError.
  // 2. Очистите свойство textContent элемента formError.
  formError.classList.remove(obj.errorClass);
  formError.textContent = "";
};

const checkInputValidity = (elementForm, inputElement, obj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(elementForm, inputElement, inputElement.validationMessage, obj);
  } else {
    hideError(elementForm, inputElement, obj);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function changeButtonState(inputList, buttonSubmit, obj) {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(obj.inactiveButtonClass);
    buttonSubmit.setAttribute("disabled", true);
  } else {
    buttonSubmit.classList.remove(obj.inactiveButtonClass);
    buttonSubmit.removeAttribute("disabled", true);
  }
}

function addListeners(obj, elementForm) {
  const inputList = Array.from(elementForm.querySelectorAll(obj.inputSelector));
  const buttonSubmit = elementForm.querySelector(obj.submitButtonSelector);

  changeButtonState(inputList, buttonSubmit, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(elementForm, inputElement, obj);
      changeButtonState(inputList, buttonSubmit, obj);
    });
  });
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((elementForm) => {
    elementForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    addListeners(obj, elementForm);
  });
}

function clearValidation(obj, elementForm) {
  const inputList = Array.from(elementForm.querySelectorAll(obj.inputSelector));
  const buttonSubmit = elementForm.querySelector(obj.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideError(elementForm, inputElement, obj);
    inputElement.setCustomValidity("");
  });
  elementForm.reset();
  changeButtonState(inputList, buttonSubmit, obj);
}
