export default class Api {
    constructor({ link, headers }) {
      this._link = link;
      this._headers = headers;
    }
    // Приватный метод получения ответа сервера
    _processingServerResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`код ошибки: ${res.status}`);
      }
    }
    // Метод загрузки карточек с сервера
    getInitialCards() {
      return fetch(`${this._link}cards`, {
        headers: this._headers,
        method: 'GET'
      })
        .then(res => { return this._processingServerResponse(res); })
    }
    // Метод добавления карточки на сервер
    addNewCard({ name, link }) {
      return fetch(`${this._link}cards`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({ name, link })
      })
        .then(res => { return this._processingServerResponse(res); })
    }
    // Метод удаления карточки с сервера
    deleteCard(cardId) {
      return fetch(`${this._link}cards/${cardId}`, {
        headers: this._headers,
        method: 'DELETE',
      })
        .then(res => { return this._processingServerResponse(res); })
    }
    // Метод получения данных пользователя с сервера
    getUserData() {
      return fetch(`${this._link}users/me`, {
        headers: this._headers,
        method: 'GET'
      })
        .then(res => { return this._processingServerResponse(res); })
    }
    // Метод отправки данных пользователя на сервер
    sendUserData(profileData) {
      return fetch(`${this._link}users/me`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({ name: profileData.username, about: profileData.description })
      })
        .then(res => { return this._processingServerResponse(res); })
    }
    // Метод отправки данных о новом аватаре на сервер
    sendAvatarData(avatarLink) {
      return fetch(`${this._link}users/me/avatar`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({ avatar: avatarLink.avatar })
      })
        .then(res => { return this._processingServerResponse(res); })
    }
    // Метод добавления лайка на сервер
    putCardLike(cardId) {
      return fetch(`${this._link}cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'PUT',
      })
        .then(res => { return this._processingServerResponse(res); })
    }
    // Метод удаления лайка с сервера
    deleteCardLike(cardId) {
      return fetch(`${this._link}cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'DELETE',
      })
        .then(res => { return this._processingServerResponse(res); })
    }
  }