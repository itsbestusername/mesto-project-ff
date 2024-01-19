import { createCard, handleDelete, likeOnCard, popupWatchImage } from "./card";

import { openWindow } from "./modal";
export {
  cohortId,
  token,
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
  getUserInfo,
  getInitialCards,
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

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const cardContainer = document.querySelector(".places__list");

const popupName = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");

const editAvatarButton = document.querySelector(".profile__image-layout");
const popupEditAvatar = document.querySelector(".popup_type_new-avatar");



function watchImage(popup, name, link) {
  openWindow(popupWatchImage);

  popupName.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
}

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

Promise.all([getUserInfo, getInitialCards])
  .then(([userInfo, initialCards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
    profileAvatar.alt = userInfo.name;
  })
  .catch((err) => {
    console.log("Ошибка при загрузке данных: ", err);
  });

function updateUserInfo(name, about) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(handleResponse)
    .then((data) => {
      console.log("Данные успешно обновлены:", data);

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
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
  .then(handleResponse);
}

function addLike(cardId, likeButton, likeCounter) {
  return fetch(
    `https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: `${token}`,
      },
    }
  )
    .then(handleResponse)
}

function removeLike(cardId, likeButton, likeCounter) {
  return fetch(
    `https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `${token}`,
      },
    }
  ).then(handleResponse);
}

function compareIdCard() {
    return  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        method: "GET",
        headers: {
          authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(handleResponse)
}

function deleteCardOnServer(cardId) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`,
    {
        method: "DELETE",
        headers: {
            authorization: `${token}`,
        },
    })
    .then(handleResponse)
}

function updateAvatar(avaUrl) {
    console.log(JSON.stringify({ avatar: avaUrl }));
    console.log(`Sending PATCH request to: https://nomoreparties.co/v1/${cohortId}/users/me/avatar`);

    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`,
    {
        method: "PATCH",
        headers: {
            authorization: `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: avaUrl,
        })
    })
    .then(handleResponse);
}