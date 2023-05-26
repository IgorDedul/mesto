export default class Section {
  // Конструктор принимает объект renderer и селектор котейнера.
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  // Метод отрисовки всех элементов
  render(dataCard) {
    dataCard.forEach(this._renderer);
  }

  // Метод принимает DOM-элемент и добавляет его в контейнер
  addItem(data) {
    this._container.prepend(data);
  }
}