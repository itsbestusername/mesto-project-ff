
// import '../pages/index.css';
// import { initialCards } from './cards';

const cardContainer = document.querySelector(".places__list");
const cards = cardContainer.querySelectorAll(".card");
const cardTemplate = document.querySelector("#card-template").content;

const addButton = document.querySelector(".profile__add-button");
const closeCreateButton = document.querySelector(".popup_type_new-card .popup__close");
const popupNewCard = document.querySelector(".popup_type_new-card");

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const editCloseButton = document.querySelector(".popup_type_edit .popup__close");

const saveButton = document.querySelector(".button .popup__button");

function createCard(card, handleDelete) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDelete);

  return cardElement;
};

function handleDelete(event) {
  const card = event.target.closest(".card");

  card.remove();
};

function addFirstCards () {
    initialCards.forEach((card) => {
      const place = createCard(card, handleDelete);
      cardContainer.append(place);
    });
  };

function openWindow(popup) {
  popup.classList.add("popup_is-opened");
}

function closeWindow(popup) {
  popup.classList.remove("popup_is-opened");
}

addButton.addEventListener("click", function() {
  openWindow(popupNewCard);
});

closeCreateButton.addEventListener("click", function () {
  closeWindow(popupNewCard);
});

editButton.addEventListener("click", function() {
  openWindow(popupEdit);
});

editCloseButton.addEventListener("click", function () {
  closeWindow(popupEdit);
});

// saveButton.addEventListener("click", function () {
//   let nameOfCard = document.querySelector(".popup__input_type_card-name").value;
//   let linkOfCard = document.querySelector(".popup__input_type_url").value;

//   if (nameOfCard && linkOfCard) {
//     const newCard = createCard({ name: nameOfCard, link: linkOfCard });
//   }

//   cardContainer.append(newCard);

//   nameOfCard = "";
//   linkOfCard = "";
// });

addFirstCards();