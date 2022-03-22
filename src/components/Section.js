export default class Section {

  constructor(items, renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  }

  renderAllItems() {
    this._items.reverse().forEach((item) => {
      const newItem = this._renderer(item);
      this.addItem(newItem);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
