export default class UserInfo {

  constructor({ _id }, userNameField, userJobField, userAvatarField) {
    this._userNameField = userNameField;
    this._userJobField = userJobField;
    this._userAvatarField = userAvatarField;
    this._userId = _id;
  }

  getUserInfo() {
    return {name: this._userNameField.textContent, about: this._userJobField.textContent, avatar: this._userAvatarField.src, userId: this._userId};
  }

  setUserInfo(data) {
    this._userNameField.textContent = data.name;
    this._userJobField.textContent = data.about;
    this._userAvatarField.src = data.avatar;
  }
}
