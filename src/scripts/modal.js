export function openClosePopup(popup, action) {
    if (action === "open") {
      popup.classList.add("popup_is-animated");
      popup.classList.add("popup_is-opened");
  
      document.addEventListener("keydown", closeOnEsc);
      document.addEventListener("mousedown", closeOnLayout);
    } else if (action === "close") {
      popup.classList.remove("popup_is-opened");
      document.removeEventListener("keydown", closeOnEsc);
      document.removeEventListener("mousedown", closeOnLayout);
    }
  };
  
 export function closeOnEsc(evt) {
    if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      openClosePopup(popup, "close");
    }
  };
  
 export function closeOnLayout(evt) {
    if (evt.target.classList.contains("popup_is-opened")) {
      const popup = document.querySelector(".popup_is-opened");
      openClosePopup(popup, "close");
    }
  };