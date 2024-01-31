export {
  handleResponse,
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  addLike,
  removeLike,
  deleteCardOnServer,
  updateAvatar,
};

const cohortId = "wff-cohort-4";
const token = "597cc019-8c26-4a34-b1e3-c76effdfead7";
const ApiBaseUrl = "https://nomoreparties.co/v1/";
const userUrl = `${ApiBaseUrl}${cohortId}/users/me`;
const cardsUrl = `${ApiBaseUrl}${cohortId}/cards`;
const commonHeaders = {
  authorization: `${token}`,
  "Content-Type": "application/json",
};

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
}).then(handleResponse);

function updateUserInfo(name, about) {
  return fetch(userUrl, {
    method: "PATCH",
    headers: commonHeaders,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
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
