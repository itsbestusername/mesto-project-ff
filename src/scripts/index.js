import "../pages/index.css";
import { initialCards } from "../scripts/cards";
import {
  cardTemplate,
  popupWatchImage,
  createCard,
  handleDelete,
  likeOnCard,
} from "../scripts/card";
import { openWindow, closeWindow, closeOnEsc, closeOnLayout } from "../scripts/modal";

const cardContainer = document.querySelector(".places__list");
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
const elementForm = document.querySelector(".popup__form");

const watchImageCloseButton = document.querySelector(
  ".popup_type_image .popup__close"
);

function watchImage(popup, name, link) {
  openWindow(popupWatchImage);

  let popupName = popup.querySelector(".popup__caption");
  let popupImage = popup.querySelector(".popup__image");

  popupName.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
}

function addFirstCards() {
  initialCards.forEach((card) => {
    const place = createCard(card, handleDelete, likeOnCard, watchImage);
    cardContainer.append(place);
  });
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  let profileTitle = document.querySelector(".profile__title");
  let profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameEditForm.value;
  profileDescription.textContent = description.value;

  closeWindow(popupEdit);
}

function handleCreateCard(evt) {
  evt.preventDefault();

  let nameOfCard = document.querySelector(".popup__input_type_card-name").value;
  let linkOfCard = document.querySelector(".popup__input_type_url").value;

  if (nameOfCard.length > 0 && linkOfCard.length > 0) {
    const newCard = createCard(
      { name: nameOfCard, link: linkOfCard },
      handleDelete,
      likeOnCard,
      watchImage
    );
    cardContainer.prepend(newCard);
  }

  closeWindow(popupNewCard);
}

elementForm.addEventListener("submit", handleFormSubmit);
elementCardForm.addEventListener("submit", (evt) => {
  handleCreateCard(evt);
  elementCardForm.reset();
});

addButton.addEventListener("click", () => {
  openWindow(popupNewCard);
});

closeCreateButton.addEventListener("click", () => {
  closeWindow(popupNewCard);
});

editButton.addEventListener("click", () => {
  openWindow(popupEdit);

  nameEditForm.value = "Жак-Ив Кусто";
  description.value = "Исследователь океана";
});

editCloseButton.addEventListener("click", () => {
  closeWindow(popupEdit);
});

watchImageCloseButton.addEventListener("click", () => {
  closeWindow(popupWatchImage);
});

addFirstCards();
