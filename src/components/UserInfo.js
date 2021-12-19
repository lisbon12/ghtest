export default class UserInfo {

  constructor(data) {
    this._userName = document.querySelector(data.userName);
    this._userJob = document.querySelector(data.userJob);
  }

  // Публичный метод, собирающий в объект текстовые значения, введённые в селекторах
  getUserInfo() {
    return {userName: this._userName.textContent, userJob: this._userJob.textContent};
  }

  // Публичный метод, подставляющий в качестве текстового значения селектора, текст, содержащийся в значении ключа переданного объекта (data)
  setUserInfo(data) {
    this._userName.textContent = data['user-name'];
    this._userJob.textContent = data['user-job'];
  }
}
