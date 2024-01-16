import { addLike, removeLike } from "./api";
export { cardTemplate, popupWatchImage, createCard, handleDelete, likeOnCard };

const cardTemplate = document.querySelector("#card-template").content;
const popupWatchImage = document.querySelector(".popup_type_image");

function createCard(card, handleDelete, likeOnCard, watchImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDelete);

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

  return cardElement;
}

function handleDelete(event) {
  const card = event.target.closest(".card");

  card.remove();
}

// function likeOnCard(evt) {
//   evt.target.classList.add("card__like-button_is-active");
// }

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
