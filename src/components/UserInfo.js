export default class UserInfo {
    // Принимает объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
    constructor(usernameSelector, userDescriptionSelector, userAvatarSelector) {
      this._username = document.querySelector(usernameSelector);
      this._userDescription = document.querySelector(userDescriptionSelector);
      this._avatarLink = document.querySelector(userAvatarSelector);
    }
    // Метод возвращает объект с данными пользователя
    getUserInfo() {
      return {
        username: this._username.textContent,
        description: this._userDescription.textContent
      };
    }
    // Метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(username, description) {
      username.value = this._username.textContent;
      description.value = this._userDescription.textContent;
    }
    // Метод изменения аватара пользователя, обновляет ссылку через src на картинку нового аватара
    setUserAvatar(avatarLink) {
      this._avatarLink.src = avatarLink;
  }
  }