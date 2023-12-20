// import '../pages/index.css';
// import { initialCards } from './cards';

const cardContainer = document.querySelector(".places__list");
const cards = cardContainer.querySelectorAll(".card");
const cardTemplate = document.querySelector("#card-template").content;

const addButton = document.querySelector(".profile__add-button");
const closeCreateButton = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const popupNewCard = document.querySelector(".popup_type_new-card");

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const editCloseButton = document.querySelector(
  ".popup_type_edit .popup__close"
);
const nameEditForm = document.querySelector(".popup__input_type_name");
const description = document.querySelector(".popup__input_type_description");
const editForm = document.querySelector(".popup__form");

const saveButton = document.querySelector(".button .popup__button");

function createCard(card, handleDelete) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDelete);

  return cardElement;
}

function handleDelete(event) {
  const card = event.target.closest(".card");

  card.remove();
}

function addFirstCards() {
  initialCards.forEach((card) => {
    const place = createCard(card, handleDelete);
    cardContainer.append(place);
  });
}

function openWindow(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
}

function closeWindow(popup) {
  popup.classList.remove("popup_is-opened");
  // document.removeEventListener('keydown', closeOnEsc);
}

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeWindow(popup);
  }
}

//реализовать закрытие по клику на лэйаут
// function closeOnLayout(evt) {
//   if (evt.target.classList.contains(".popup_is-opened")) {
//     closeWindow(popup);
//   }
// };

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  let profileTitle = document.querySelector(".profile__title");
  let profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameEditForm.value;
  profileDescription.textContent = description.value;

  closeWindow(popupEdit);
}

editForm.addEventListener("submit", handleFormSubmit);

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

document.addEventListener("keydown", closeOnEsc);
// document.addEventListener('mousedown', closeOnLayout);

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
