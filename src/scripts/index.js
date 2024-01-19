import "../pages/index.css";
import {
  popupWatchImage,
  createCard,
  handleDelete,
  likeOnCard,
  popupDelete,
  currentCard,
} from "../scripts/card";
import {
  openWindow,
  closeWindow
} from "../scripts/modal";
import {
  elementForm,
  inputElements,
  validationConfig,
  checkInputValidity,
  clearValidation
} from "./validation";

import {
  profileTitle,
  profileDescription,
  profileAvatar,
  cardContainer,
  editAvatarButton,
  popupEditAvatar,
  watchImage,
  updateUserInfo,
  addNewCard,
  updateAvatar
} from "./api";

const cards = cardContainer.querySelectorAll(".card");

const addButton = document.querySelector(".profile__add-button");
const closeCreateButton = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const popupNewCard = document.querySelector(".popup_type_new-card");
const elementCardForm = document.forms["new-place"];
const saveNewCard = elementCardForm.querySelector(".popup__button");

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const editCloseButton = document.querySelector(
  ".popup_type_edit .popup__close"
);
const nameEditForm = document.querySelector(".popup__input_type_name");
const description = document.querySelector(".popup__input_type_description");
const editProfileForm = document.forms["edit-profile"];
const saveProfileButton = editProfileForm.querySelector(".popup__button");

const watchImageCloseButton = document.querySelector(
  ".popup_type_image .popup__close"
);

let nameOfCard = document.querySelector(".popup__input_type_card-name");
let linkOfCard = document.querySelector(".popup__input_type_url");
const nameValue = nameOfCard.value;
const linkValue = linkOfCard.value;

const confirmButton = popupDelete.querySelector(".popup_type_delete-button");
const closeButtonPopupDelete = popupDelete.querySelector(".popup__close");

const avatarLinkInput = popupEditAvatar.querySelector(".avatar-input");
const avatarForm = document.forms["new-avatar"];
const saveAvaButton = avatarForm.querySelector(".popup__button");

editAvatarButton.addEventListener("click", () => {
  openWindow(popupEditAvatar);

  avatarLinkInput.value = "";
  saveAvaButton.textContent = "Сохранить";
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newLink = avatarLinkInput.value;

  changeButtonWord(saveAvaButton);
  updateAvatar(newLink)
    .then((link) => {
      const ava = link.avatar;

      createAvatarElement(ava);
      console.log("Аватар успешно обновлен");
      closeWindow(popupEditAvatar);
    })
    .catch((err) => {
      console.error("Не получилось обновить аватар", err);
    });
});

function changeButtonWord(button) {
  button.textContent = "Сохранение...";
}

function createAvatarElement(link) {
  profileAvatar.style.backgroundImage = `url('${link}')`;
  return profileAvatar;
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameEditForm.value;
  const newAbout = description.value;

  changeButtonWord(saveProfileButton);
  updateUserInfo(newName, newAbout);
  closeWindow(popupEdit);
}

function handleCreateCard(evt) {
  evt.preventDefault();

  const nameOfNewCard = nameOfCard.value;
  const linkOfNewCard = linkOfCard.value;

  if (nameOfNewCard.length > 0 && linkOfNewCard.length > 0) {
    const newCard = { name: nameOfNewCard, link: linkOfNewCard };
    changeButtonWord(saveNewCard);
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
    console.error("Ошибка: Новая карточка не получена от сервера.");
  }
}

elementForm.addEventListener("submit", handleFormSubmit);

elementCardForm.addEventListener("submit", (evt) => {
  handleCreateCard(evt);
});

addButton.addEventListener("click", () => {
  openWindow(popupNewCard);

  saveNewCard.textContent = "Сохранить";
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
  saveProfileButton.textContent = "Сохранить";
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
  handleDelete(currentCard);
  console.log("клик сработал"); //
});

// Обработчик для крестика (закрытия попапа без удаления)
closeButtonPopupDelete.addEventListener("click", () => {
  closeWindow(popupDelete);
});
