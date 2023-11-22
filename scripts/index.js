// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardContainer = document.querySelector('.places__list');
const cards = cardContainer.querySelectorAll('.card');
const likeButton = document.querySelector('.card__like-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup_type_new-card .popup__close');
const popupNewCard = document.querySelector('.popup_type_new-card');

function createCity(city) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = city.link;
    cardElement.querySelector('.card__image').alt = city.name;
    cardElement.querySelector('.card__title').textContent = city.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        cardElement.remove();
    });

    return cardElement;
}

document.addEventListener('DOMContentLoaded', function () {
    const initialCards = [
        {
          name: "Архыз",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
        },
        {
          name: "Челябинская область",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
        },
        {
          name: "Иваново",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
        },
        {
          name: "Камчатка",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
        },
        {
          name: "Холмогорский район",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
        },
        {
          name: "Байкал",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
        }
    ];

    initialCards.forEach((city) => {
        const card = createCity(city);
        cardContainer.append(card);
    });
});

addButton.addEventListener('click', function () {

  popupNewCard.classList.add('popup_is-opened');
});

closeButton.addEventListener('click', function () {
  popupNewCard.classList.remove('popup_is-opened');
});