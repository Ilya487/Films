class Header {
  constructor() {
    this.searchField = document.querySelector(".header__search input");
    this.setEventOnSearchField();
  }

  render() {
    films.render(templateForSearch + `&name=${this.searchField.value}`);
  }

  setEventOnSearchField() {
    this.searchField.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        this.render();
      }
    });
  }
}

const header = new Header();
