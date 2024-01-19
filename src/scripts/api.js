import { createCard, handleDelete, likeOnCard, popupWatchImage } from "./card";

import { openWindow } from "./modal";
export {
    cohortId,
    token,
    getUserInfo,
    getInitialCards,
    profileTitle,
    profileDescription,
    profileAvatar,
    cardContainer,
    popupName,
    popupImage,
    editAvatarButton,
    popupEditAvatar,
    watchImage,
    handleResponse,
    updateUserInfo,
    addNewCard,
    addLike,
    removeLike,
    compareIdCard,
    deleteCardOnServer,
    updateAvatar
};

const cohortId = "wff-cohort-4";
const token = "597cc019-8c26-4a34-b1e3-c76effdfead7";
const ApiBaseUrl = "https://nomoreparties.co/v1/";
const userUrl = `${ApiBaseUrl}${cohortId}/users/me`;
const cardsUrl = `${ApiBaseUrl}${cohortId}/cards`;
const likesUrl = `${ApiBaseUrl}${cohortId}/cards/likes`;
const commonHeaders = {
  authorization: `${token}`,
  "Content-Type": "application/json",
};

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const cardContainer = document.querySelector(".places__list");

const popupName = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");

const editAvatarButton = document.querySelector(".profile__image-layout");
const popupEditAvatar = document.querySelector(".popup_type_new-avatar");

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserInfo = fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
  headers: {
    authorization: `${token}`,
  },
}).then(handleResponse);

const getInitialCards = fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
  headers: {
    authorization: `${token}`,
  },
})
  .then(handleResponse)
  .then((data) => {
    data.forEach((card) => {
      const place = createCard(card, handleDelete, likeOnCard, watchImage);
      cardContainer.append(place);
    });
  });


function watchImage(popup, name, link) {
  openWindow(popupWatchImage);

  popupName.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
}

function updateUserInfo(name, about) {
  fetch(userUrl, {
    method: "PATCH",
    headers: commonHeaders,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(handleResponse)
    .then((data) => {
      console.log("Данные успешно обновлены");

      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      profileAvatar.src = data.avatar;
      profileAvatar.alt = data.name;
    })
    .catch((err) => {
      console.log("Ошибка при обновлении данных пользователя:", err);
    });
}

function addNewCard(cardData) {
  return fetch(cardsUrl, {
    method: "POST",
    headers: commonHeaders,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then(handleResponse);
}

function addLike(cardId, likeButton, likeCounter) {
  return fetch(`${ApiBaseUrl}${cohortId}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: `${token}`,
    },
  }).then(handleResponse);
}

function removeLike(cardId, likeButton, likeCounter) {
  return fetch(`${ApiBaseUrl}${cohortId}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: `${token}`,
    },
  }).then(handleResponse);
}

function compareIdCard() {
  return fetch(userUrl, {
    method: "GET",
    headers: commonHeaders,
  }).then(handleResponse);
}

function deleteCardOnServer(cardId) {
  return fetch(`${ApiBaseUrl}${cohortId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: `${token}`,
    },
  }).then(handleResponse);
}

function updateAvatar(avaUrl) {
  return fetch(`${ApiBaseUrl}${cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: commonHeaders,
    body: JSON.stringify({
      avatar: avaUrl,
    }),
  }).then(handleResponse);
}
