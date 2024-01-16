import {elementForm, validationConfig, clearValidation} from "./validation";
export { openWindow, closeWindow, closeOnEsc, closeOnLayout };

function openWindow(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeOnEsc);
  document.addEventListener("mousedown", closeOnLayout);
}

function closeWindow(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEsc);
  document.removeEventListener("mousedown", closeOnLayout);

  // const form = popup.querySelector(validationConfig.formSelector)
  // clearValidation(form, validationConfig);
}

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeWindow(popup);
  }
}

function closeOnLayout(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    const popup = document.querySelector(".popup_is-opened");
    closeWindow(popup);
  }
}
