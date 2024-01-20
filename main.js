(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{A:()=>oe});var t="wff-cohort-4",n="597cc019-8c26-4a34-b1e3-c76effdfead7",o="https://nomoreparties.co/v1/",r="".concat(o).concat(t,"/users/me"),c="".concat(o).concat(t,"/cards"),a=("".concat(o).concat(t,"/cards/likes"),{authorization:"".concat(n),"Content-Type":"application/json"}),u=document.querySelector(".profile__title"),i=document.querySelector(".profile__description"),l=document.querySelector(".profile__image"),s=document.querySelector(".places__list"),d=document.querySelector(".profile__image-layout"),p=document.querySelector(".popup_type_new-avatar"),_=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},f=fetch("https://nomoreparties.co/v1/".concat(t,"/users/me"),{headers:{authorization:"".concat(n)}}).then(_),m=fetch("https://nomoreparties.co/v1/".concat(t,"/cards"),{headers:{authorization:"".concat(n)}}).then(_);function y(e){e.classList.add("popup_is-animated"),e.classList.add("popup_is-opened"),document.addEventListener("keydown",h),document.addEventListener("mousedown",S)}function v(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",h),document.removeEventListener("mousedown",S)}function h(e){"Escape"===e.key&&v(document.querySelector(".popup_is-opened"))}function S(e){e.target.classList.contains("popup_is-opened")&&v(e.target)}var b,q,L=document.querySelector("#card-template").content,k=document.querySelector(".popup_type_image"),E=document.querySelector(".popup_type_delete");function g(e,t,n,o,c){var u=L.querySelector(".places__item").cloneNode(!0);u.querySelector(".card__image").src=e.link,u.querySelector(".card__image").alt=e.name,u.querySelector(".card__title").textContent=e.name,u.querySelector(".card__image").addEventListener("click",(function(){o(k,e.name,e.link)}));var i=u.querySelector(".card__delete-button"),l=c;fetch(r,{method:"GET",headers:a}).then(_).then((function(t){l=t._id,e.owner._id===l?i.addEventListener("click",(function(t){b=t.target.closest(".card"),q=e._id,y(E)})):i.style.display="none"})).catch((function(e){console.error("Ошибка сравнения id карты")}));var s=u.querySelector(".card__like-button"),d=u.querySelector(".card__like-counter");return d.textContent=e.likes.length,e.likes.some((function(e){return e._id===l}))&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",(function(){var t=e._id;n(t,s,d)})),u}function C(e,r,c){r.classList.contains("card__like-button_is-active")?function(e,r,c){return fetch("".concat(o).concat(t,"/cards/likes/").concat(e),{method:"DELETE",headers:{authorization:"".concat(n)}}).then(_)}(e).then((function(e){c.textContent=e.likes.length,r.classList.remove("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при удалении лайка на сервере:",e)})):function(e,r,c){return fetch("".concat(o).concat(t,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:"".concat(n)}}).then(_)}(e).then((function(e){c.textContent=e.likes.length,r.classList.add("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при добавлении лайка на сервере:",e)}))}var x=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("form__input_type_error"),n.classList.remove("form__input-error_active"),n.textContent=""};function A(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(oe.inactiveButtonClass),t.removeAttribute("disabled",!0)):(t.classList.add(oe.inactiveButtonClass),t.setAttribute("disabled",!0))}function w(e){var t=Array.from(e.querySelectorAll(oe.inputSelector)),n=e.querySelector(oe.submitButtonSelector);t.forEach((function(t){x(e,t),t.setCustomValidity("")})),e.reset(),A(t,n)}function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}s.querySelectorAll(".card");var j,T,P=document.querySelector(".profile__add-button"),z=document.querySelector(".popup_type_new-card .popup__close"),B=document.querySelector(".popup_type_new-card"),D=document.forms["new-place"],I=D.querySelector(".popup__button"),M=document.querySelector(".profile__edit-button"),N=document.querySelector(".popup_type_edit"),J=document.querySelector(".popup_type_edit .popup__close"),V=document.querySelector(".popup__input_type_name"),H=document.querySelector(".popup__input_type_description"),U=document.forms["edit-profile"],G=U.querySelector(".popup__button"),$=document.querySelector(".popup__caption"),F=document.querySelector(".popup__image"),K=document.querySelector(".popup_type_image .popup__close"),Q=document.querySelector(".popup__input_type_card-name"),R=document.querySelector(".popup__input_type_url"),W=E.querySelector(".popup_type_delete-button"),X=E.querySelector(".popup__close"),Y=p.querySelector(".avatar-input"),Z=document.forms["new-avatar"],ee=Z.querySelector(".popup__button"),te=document.querySelector(".popup_type_new-avatar"),ne=te.querySelector(".popup__close"),oe={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function re(e){e.textContent="Сохранение..."}function ce(e,t,n){y(k),$.textContent=t,F.src=n,F.alt=t}Promise.all([f,m]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?O(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];u.textContent=r.name,i.textContent=r.about,l.style.backgroundImage="url('".concat(r.avatar,"')"),c.forEach((function(e){var t=g(e,0,C,ce,j=r._id);s.append(t)}))})).catch((function(e){console.log("Ошибка при загрузке данных: ",e)})),U.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=V.value,c=H.value;re(G),t=o,n=c,fetch(r,{method:"PATCH",headers:a,body:JSON.stringify({name:t,about:n})}).then(_).then((function(e){console.log("Данные успешно обновлены"),u.textContent=e.name,i.textContent=e.about,l.src=e.avatar,l.alt=e.name})).catch((function(e){console.log("Ошибка при обновлении данных пользователя:",e)})),v(N)})),D.addEventListener("submit",(function(e){!function(e){e.preventDefault();var t,n={name:Q.value,link:R.value};re(I),(t=n,fetch(c,{method:"POST",headers:a,body:JSON.stringify({name:t.name,link:t.link})}).then(_)).then((function(e){var t=g(e,0,C,ce,j);s.prepend(t),v(B),D.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки на страницу:",e)}))}(e)})),P.addEventListener("click",(function(){y(B),I.textContent="Сохранить"})),z.addEventListener("click",(function(){v(B),D.reset(),w(B.querySelector(oe.formSelector))})),M.addEventListener("click",(function(){y(N),V.value=u.textContent,H.value=i.textContent,G.textContent="Сохранить"})),J.addEventListener("click",(function(){v(N),w(N.querySelector(oe.formSelector))})),K.addEventListener("click",(function(){v(k)})),W.addEventListener("click",(function(){var e;(e=q,fetch("".concat(o).concat(t,"/cards/").concat(e),{method:"DELETE",headers:{authorization:"".concat(n)}}).then(_)).then((function(){b.remove(),v(E)})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))})),X.addEventListener("click",(function(){v(E)})),d.addEventListener("click",(function(){y(p),Y.value="",ee.textContent="Сохранить",w(te.querySelector(oe.formSelector))})),ne.addEventListener("click",(function(){v(p)})),Z.addEventListener("submit",(function(e){e.preventDefault();var n,r=Y.value;re(ee),(n=r,fetch("".concat(o).concat(t,"/users/me/avatar"),{method:"PATCH",headers:a,body:JSON.stringify({avatar:n})}).then(_)).then((function(e){!function(e){l.style.backgroundImage="url('".concat(e,"')")}(e.avatar),console.log("Аватар успешно обновлен"),v(p)})).catch((function(e){console.error("Не получилось обновить аватар",e)}))})),T=oe,Array.from(document.querySelectorAll(T.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(oe.inputSelector)),n=e.querySelector(oe.submitButtonSelector);A(t,n),t.forEach((function(o){o.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?x(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("form__input_type_error"),o.textContent=n,o.classList.add("form__input-error_active")}(e,t,t.validationMessage)})(e,o),A(t,n)}))}))}(e)}))})();