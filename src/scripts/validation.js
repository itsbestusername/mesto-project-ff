export {
  elementForm,
  inputElements,
  validationConfig,
  showError,
  hideError,
  checkInputValidity,
  hasInvalidInput,
  changeButtonState,
  addListeners,
  enableValidation,
  clearValidation,
};

const elementForm = document.querySelector(".popup__form");
const inputElements = elementForm.querySelectorAll(".popup__input");
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
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
  const regex = /^[a-zA-Zа-яА-Я\s\-ёЁ]+$/;
   if (!regex.test(inputElement.value) && inputElement.id !== "link-input") {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы."
    );
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(elementForm, inputElement, inputElement.validationMessage);
  } else {
    hideError(elementForm, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function changeButtonState(inputList, buttonSubmit) {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add("popup__button_disabled");
    buttonSubmit.setAttribute("disabled", true);
  } else {
    buttonSubmit.classList.remove("popup__button_disabled");
    buttonSubmit.removeAttribute("disabled", true);
  }
}

function addListeners(obj, elementForm) {
  const inputList = Array.from(elementForm.querySelectorAll(obj.inputSelector));
  const buttonSubmit = elementForm.querySelector(obj.submitButtonSelector);

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
    addListeners(obj, elementForm);
  });
}

function clearValidation(elementForm, validationConfig) {
  const inputList = Array.from(elementForm.querySelectorAll(validationConfig.inputSelector));
  const buttonSubmit = elementForm.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideError(elementForm, inputElement);
    inputElement.setCustomValidity("");
  });

  changeButtonState(inputList, buttonSubmit);
}

enableValidation(validationConfig);
