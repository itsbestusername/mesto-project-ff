export const cardTemplate = document.querySelector("#card-template").content;

export function createCard(card, handleDelete, likeOnCard, watchImage) {
    const cardElement = cardTemplate
      .querySelector(".places__item")
      .cloneNode(true);
  
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__image").alt = card.name;
    cardElement.querySelector(".card__title").textContent = card.name;
  
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", handleDelete);
  
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", likeOnCard);
  
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      watchImage(popupWatchImage, card.name, card.link);
    })
  
    return cardElement;
  };
  
export  function handleDelete(event) {
    const card = event.target.closest(".card");
  
    card.remove();
  };
  
export  function likeOnCard(evt) {
    evt.target.classList.add("card__like-button_is-active");
  };
  
  