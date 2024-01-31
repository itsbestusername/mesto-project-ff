import { addLike, removeLike, deleteCardOnServer } from "./api";
import { openWindow, closeWindow } from "./modal";
export {
  cardTemplate,
  popupWatchImage,
  createCard,
  handleDelete,
  likeOnCard,
  popupDelete,
  currentCard,
  cardIdDelete,
};

const cardTemplate = document.querySelector("#card-template").content;
const popupWatchImage = document.querySelector(".popup_type_image");
const popupDelete = document.querySelector(".popup_type_delete");
let currentCard;
let cardIdDelete;

function createCard(
  card,
  handleDelete,
  likeOnCard,
  watchImage,
  initialProfileId
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    watchImage(popupWatchImage, card.name, card.link);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (card.owner._id === initialProfileId) {
    deleteButton.addEventListener("click", (evt) => {
      currentCard = evt.target.closest(".card"); //сохраняю карточку в переменную
      cardIdDelete = card._id;

      openWindow(popupDelete);
    });
  } else {
    deleteButton.style.display = "none";
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  // Определить начальное количество лайков
  likeCounter.textContent = card.likes.length;

  // Проверить, лайкнута ли карточка текущим пользователем
  const haveMyLike = card.likes.some((like) => {
    return like._id === initialProfileId;
  });
  //если да, то проставляем активный класс лайку
  if (haveMyLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", function () {
    const cardId = card._id;
    likeOnCard(cardId, likeButton, likeCounter);
  });

  return cardElement;
}

function handleDelete() {
  deleteCardOnServer(cardIdDelete)
    .then(() => {
      currentCard.remove();
      closeWindow(popupDelete);
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
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
