export default class Section {
  // Конструктор принимает items (массив данных для отображения) и функцию отрисовки данных renderer.
  constructor({items, renderer}, selector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(selector);
  }
  // Метод отрисовки всех элементов
  render() {
    this._items.forEach((elementCard) => {
        this.addItem(elementCard);
    })
  }

  // Метод принимает DOM-элемент и добавляет его в контейнер
  addItem(data) {
    this._container.prepend(this._renderer(data));
  }
}