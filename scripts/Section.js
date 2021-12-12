export default class Section {

  constructor({ items, renderer }, containerSelector) {
    this._initialItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Публичный метод, который применяет к каждому элементу InitialItems функцию renderer, которая должна сформировать их вид
  renderItems() {
    this._initialItems.forEach(item => {
      this._renderer(item);
    });
  }

  // Публичный метод, который добавляет сформированный элемент в контейнер (секцию)
  addItem(item) {
    this._container.prepend(item);
  }
}
