import "../pages/index.css";
import {
  popupWatchImage,
  createCard,
  handleDelete,
  likeOnCard,
  popupDelete,
  currentCard,
} from "../scripts/card";
import { openWindow, closeWindow } from "../scripts/modal";
import { enableValidation, clearValidation } from "./validation";

import {
  profileTitle,
  profileDescription,
  profileAvatar,
  cardContainer,
  editAvatarButton,
  popupEditAvatar,
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
} from "./api";

export { validationConfig };

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

const nameEditForm = document.querySelector(".popup__input_type_name"); //
const description = document.querySelector(".popup__input_type_description"); //

const editProfileForm = document.forms["edit-profile"];
const saveProfileButton = editProfileForm.querySelector(".popup__button");

const popupName = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");

const watchImageCloseButton = document.querySelector(
  ".popup_type_image .popup__close"
);

const nameOfCard = document.querySelector(".popup__input_type_card-name");
const linkOfCard = document.querySelector(".popup__input_type_url");

const confirmButton = popupDelete.querySelector(".popup_type_delete-button");
const closeButtonPopupDelete = popupDelete.querySelector(".popup__close");

const avatarLinkInput = popupEditAvatar.querySelector(".avatar-input");
const avatarForm = document.forms["new-avatar"];
const saveAvaButton = avatarForm.querySelector(".popup__button");
const avatarElement = document.querySelector(".popup_type_new-avatar");
const closeAvatarButton = avatarElement.querySelector(".popup__close");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let initialProfileId;

Promise.all([getUserInfo, getInitialCards])
  .then(([userInfo, initialCards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url('${userInfo.avatar}')`;

    initialCards.forEach((card) => {
      initialProfileId = userInfo._id;
      const place = createCard(
        card,
        handleDelete,
        likeOnCard,
        watchImage,
        initialProfileId
      );
      cardContainer.append(place);
    });
  })
  .catch((err) => {
    console.log("Ошибка при загрузке данных: ", err);
  });

function changeButtonWord(button) {
  button.textContent = "Сохранение...";
}

function createAvatarElement(link) {
  profileAvatar.style.backgroundImage = `url('${link}')`;
  return profileAvatar;
}

function handleCreateCard(evt) {
  evt.preventDefault();

  const nameOfNewCard = nameOfCard.value;
  const linkOfNewCard = linkOfCard.value;

  const newCard = { name: nameOfNewCard, link: linkOfNewCard };
  changeButtonWord(saveNewCard);
  addNewCard(newCard)
    .then((newCard) => {
      const newCardElement = createCard(
        newCard,
        handleDelete,
        likeOnCard,
        watchImage,
        initialProfileId
      );
      cardContainer.prepend(newCardElement);

      closeWindow(popupNewCard);
      elementCardForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки на страницу:", err);
    });
}

function watchImage(popup, name, link) {
  openWindow(popupWatchImage);

  popupName.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
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

editProfileForm.addEventListener("submit", handleFormSubmit);

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

// Обработчик для кнопки подтверждения удаления
confirmButton.addEventListener("click", () => {
  handleDelete(currentCard);
});

// Обработчик для крестика (закрытия попапа без удаления)
closeButtonPopupDelete.addEventListener("click", () => {
  closeWindow(popupDelete);
});

editAvatarButton.addEventListener("click", () => {
  openWindow(popupEditAvatar);

  avatarLinkInput.value = "";
  saveAvaButton.textContent = "Сохранить";

  const form = avatarElement.querySelector(validationConfig.formSelector);
  clearValidation(form, validationConfig);
});

closeAvatarButton.addEventListener("click", () => {
  closeWindow(popupEditAvatar);
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

enableValidation(validationConfig);
