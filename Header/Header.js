class Header {
  constructor() {
    this.searchField = document.querySelector(".header__search input");
    this.setEventOnSearchField();
  }

  render() {
    localStorage.setItem(
      "searchUrl",
      templateForSearch + `&name=${this.searchField.value}`
    );

    location.href = "/";
  }

  setEventOnSearchField() {
    this.searchField.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        this.render();
      }
    });
  }

  goToMain(e) {
    localStorage.setItem("main", 1);
  }
}

const header = new Header();
