import "../pages/index.css";
import {
  cardTemplate,
  popupWatchImage,
  createCard,
  handleDelete,
  likeOnCard,
  popupDelete,
  card
} from "../scripts/card";
import {
  openWindow,
  closeWindow,
  closeOnEsc,
  closeOnLayout,
} from "../scripts/modal";
import {
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
} from "./validation";

import {
  cohortId,
  token,
  profileTitle,
  profileDescription,
  profileAvatar,
  cardContainer,
  popupName,
  popupImage,
  watchImage,
  handleResponse,
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  addLike,
  removeLike,
  compareIdCard,
  deleteCardOnServer,
  updateAvatar
} from "./api";

const cards = cardContainer.querySelectorAll(".card");

const addButton = document.querySelector(".profile__add-button");
const closeCreateButton = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const popupNewCard = document.querySelector(".popup_type_new-card");
const elementCardForm = document.forms["new-place"];

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const editCloseButton = document.querySelector(
  ".popup_type_edit .popup__close"
);
const nameEditForm = document.querySelector(".popup__input_type_name");
const description = document.querySelector(".popup__input_type_description");

const watchImageCloseButton = document.querySelector(
  ".popup_type_image .popup__close"
);

let nameOfCard = document.querySelector(".popup__input_type_card-name");
let linkOfCard = document.querySelector(".popup__input_type_url");
const nameValue = nameOfCard.value;
const linkValue = linkOfCard.value;

const confirmButton = popupDelete.querySelector(
  ".popup_type_delete-button"
);
const closeButtonPopupDelete = popupDelete.querySelector(".popup__close");


// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameEditForm.value;
  const newAbout = description.value;

  updateUserInfo(newName, newAbout);
  closeWindow(popupEdit);
}

function handleCreateCard(evt) {
  evt.preventDefault();

  const nameOfNewCard = nameOfCard.value;
  const linkOfNewCard = linkOfCard.value;

  if (nameOfNewCard.length > 0 && linkOfNewCard.length > 0) {
    const newCard = { name: nameOfNewCard, link: linkOfNewCard };

    addNewCard(newCard)
      .then((newCard) => {
        const newCardElement = createCard(
          newCard,
          handleDelete,
          likeOnCard,
          watchImage
        );
        cardContainer.prepend(newCardElement);

        closeWindow(popupNewCard);
        elementCardForm.reset();
      })
      .catch((err) => {
        console.error("Ошибка при добавлении карточки на страницу:", err);
      });
  } else {
    console.error('Ошибка: Новая карточка не получена от сервера.');
  }
}

elementForm.addEventListener("submit", handleFormSubmit);

elementCardForm.addEventListener("submit", (evt) => {
  handleCreateCard(evt);
});

addButton.addEventListener("click", () => {
  openWindow(popupNewCard);
});

closeCreateButton.addEventListener("click", () => {
  closeWindow(popupNewCard);
  elementCardForm.reset();

  const form = popupNewCard.querySelector(validationConfig.formSelector);
  clearValidation(form, validationConfig);
});

editButton.addEventListener("click", () => {
  openWindow(popupEdit);

  nameEditForm.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
});

editCloseButton.addEventListener("click", () => {
  closeWindow(popupEdit);

  const form = popupEdit.querySelector(validationConfig.formSelector);
  clearValidation(form, validationConfig);
});

watchImageCloseButton.addEventListener("click", () => {
  closeWindow(popupWatchImage);
});

inputElements.forEach((inputElement) => {
  inputElement.addEventListener("input", function () {
    checkInputValidity(elementForm, inputElement);
  });
});

elementForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  inputElements.forEach((inputElement) => {
    checkInputValidity(elementForm, inputElement);
  });
});

// Обработчик для кнопки подтверждения удаления
confirmButton.addEventListener("click", () => {
  handleDelete();
  console.log("клик сработал")//
});

// Обработчик для крестика (закрытия попапа без удаления)
closeButtonPopupDelete.addEventListener("click", () => {
  closeWindow(popupDelete);
});