import { addLike, removeLike, cohortId, token, handleResponse } from "./api";
import { openWindow, closeWindow } from "./modal";
export { cardTemplate, popupWatchImage, createCard, handleDelete, likeOnCard };

const cardTemplate = document.querySelector("#card-template").content;
const popupWatchImage = document.querySelector(".popup_type_image");
let card;

function createCard(card, handleDelete, likeOnCard, watchImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    const cardId = card._id;
    likeOnCard(cardId, likeButton, likeCounter);
  });

  const likeCounter = cardElement.querySelector(".card__like-counter");
  // Определите начальное количество лайков
  likeCounter.textContent = card.likes.length;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    watchImage(popupWatchImage, card.name, card.link);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "GET",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .then((res) => {
      if (card.owner._id === res._id) {
        deleteButton.addEventListener("click", () => {
          const popupDelete = document.querySelector(".popup_type_delete");
          const confirmButton = popupDelete.querySelector(
            ".popup_type_delete-button"
          );
          const closeButton = popupDelete.querySelector(".popup__close");
          openWindow(popupDelete);
          // Обработчик для кнопки подтверждения удаления
          confirmButton.addEventListener("click", (evt) => {
            handleDelete(evt);
            closeWindow(popupDelete);
          });

          // Обработчик для крестика (закрытия попапа без удаления)
          closeButton.addEventListener("click", () => {
            closeWindow(popupDelete);
          });
        });
      } else {
        deleteButton.style.display = "none";
      }
    })
    .catch((res) => {
      console.error("Ошибка сравнения id карты");
    });

  return cardElement;
}

function handleDelete(evt) {
  card = evt.target.closest(".card");
  card.remove();
}

function likeOnCard(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    // Удалить лайк
    removeLike(cardId, likeButton, likeCounter)
      .then((updatedCard) => {
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.error("Ошибка при удалении лайка на сервере:", error);
      });
  } else {
    // Добавить лайк
    addLike(cardId, likeButton, likeCounter)
      .then((updatedCard) => {
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.error("Ошибка при добавлении лайка на сервере:", error);
      });
  }
}
