class Films {
  constructor(pagesOnScreen) {
    this.maxPagesOnScreen = pagesOnScreen;
  }

  async getFilms(url) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-API-KEY", API_KEY);

    xhr.send();

    const data = await new Promise((resolve, reject) => {
      xhr.onload = () => {
        resolve(JSON.parse(xhr.response));
      };
    });

    return data;
  }

  getRatingBackground(rate) {
    if (rate >= 7) {
      return "green";
    } else if (rate > 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  setCountPagesOnScreen(maxPages) {
    localStorage.setItem("maxPagesOnScreen", maxPages);

    this.maxPagesOnScreen = maxPages;
    this.render(this.url);
  }

  parsingMovieLength(movieLength) {
    const hours = Math.floor(movieLength / 60);
    const minutes = movieLength - 60 * hours;
    return `${hours} ч. ${minutes} мин.`;
  }

  async render(url) {
    try {
      ROOT__FILMS.innerHTML = "";

      preloader.render();

      this.url = url;

      this.data = await this.getFilms(url);

      if (this.data.docs.length == 0) {
        this.notFound(url);
        return;
      }

      let filmsHtml = "";

      this.data.docs.forEach((film) => {
        filmsHtml += `
            <div class="films__item">
                <div class="films__img">
                  <img
                      src=${film.poster?.url || film.poster}
                      alt="${film.name} poster"
                      onclick="films.openFilmDescription(${film.id})"
                  />
                </div>  
                <p class="films__name">${film.name}</p>
                <p class="films__year">${film.year} г.</p>
                <p class="films__length">${this.parsingMovieLength(
                  film.movieLength
                )}</p>
                <p class="films__genres">
                    ${film.genres.map((genre) => genre.name).join(", ")}
                </p>
                <div class="films__rating films__rating--${this.getRatingBackground(
                  film.rating.imdb
                )}">${film.rating.imdb}</div>
            </div>
        `;
      });

      const html = `
    <div class="films__container">
        ${filmsHtml}
        </div>
    `;

      ROOT__FILMS.innerHTML = html;

      this.drawPages(url);
    } catch (e) {
      preloader.clear();
      error.render();
    }
  }

  notFound(url) {
    preloader.clear();

    const name = url.slice(url.indexOf("&name=")).replace("&name=", "");

    ROOT__FILMS.innerHTML = `
        <div class="films__notFound">
        <h1 class="films__notFound-header">
          По запросу «${name}» ничего не найдено
        </h1>
        <p class="films__notFound-text">
          К сожалению по вашему запросу ничего не найдено.
        </p>
      </div>
    `;
  }

  drawPages(url) {
    const pages = this.data.pages;
    const page = this.data.page;

    this.maxPagesOnScreen =
      this.maxPagesOnScreen > pages ? pages : this.maxPagesOnScreen;
    if (this.maxPagesOnScreen <= 1) {
      preloader.clear();
      return;
    }

    let buttonsHtml = ``;
    const center = Math.floor(this.maxPagesOnScreen / 2);
    let start;
    let end;

    if (page < center) {
      start = 0;
      end = this.maxPagesOnScreen;
    } else {
      end = page + center > pages ? pages : page + center;

      start =
        end - page - center < this.maxPagesOnScreen
          ? end - this.maxPagesOnScreen
          : page - center;
    }
    for (let i = start; i < end; i++) {
      buttonsHtml += `
        <li class="pages__item">
          <button class="pages__item-btn pages__item-btn--number${
            i == page - 1 ? " pages__item-btn--active" : ""
          }" data-number=${i + 1}>
            ${i + 1}
          </button>
        </li>
      `;
    }

    const html = `
      <ul class="pages__items">
        ${buttonsHtml}
      </ul>
    `;

    ROOT__FILMS.innerHTML += html;
    this.drawPrevNextButtons(pages, page, url);

    this.setEventOnPageBtn(url, page);

    preloader.clear();
  }

  setEventOnPageBtn(url, page) {
    const pagesContainer = document.querySelector(".pages__items");

    pagesContainer.addEventListener("click", (e) => {
      const button = e.target.closest(".pages__item-btn--number");

      if (button) {
        this.switchPage(button, url, page);
      }
    });
  }

  switchPage(button, url, page) {
    const buttonNumber = button.dataset.number;

    const changedUrl = url.replace(`page=${page}`, `page=${buttonNumber}`);
    this.render(changedUrl);
  }

  drawPrevNextButtons(pages, page, url) {
    const prevButton = `
      <li class="pages__item">
        <button class="pages__item-btn pages__item-btn--prev">
        &#10094
        </button>
      </li>
    `;

    const nextButton = `
      <li class="pages__item">
        <button class="pages__item-btn pages__item-btn--next">
        &#10095
        </button>
      </li>
    `;

    this.setEventOnPrevNextButtons(pages, page, url);

    const buttonsUl = document.querySelector(".pages__items");
    buttonsUl.insertAdjacentHTML("afterbegin", prevButton);
    buttonsUl.insertAdjacentHTML("beforeend", nextButton);
  }

  setEventOnPrevNextButtons(pages, page, url) {
    const pagesContainer = document.querySelector(".pages__items");

    pagesContainer.addEventListener("click", (e) => {
      const prevButton = e.target.closest(".pages__item-btn--prev");
      const nextButton = e.target.closest(".pages__item-btn--next");

      if (prevButton) {
        this.switchOnPrevPage(pages, page, url);
      }
      if (nextButton) {
        this.switchOnNextPage(pages, page, url);
      }
    });
  }

  switchOnPrevPage(pages, page, url) {
    if (page - 1 <= 0) return;

    const button = document.querySelector(`[data-number="${page - 1}"]`);

    this.switchPage(button, url, page);
  }

  switchOnNextPage(pages, page, url) {
    if (page + 1 > pages) return;

    const button = document.querySelector(`[data-number="${page + 1}"]`);

    this.switchPage(button, url, page);
  }
  openFilmDescription(id) {
    history.replaceState(this.url, "");

    const film = this.data.docs.filter((film) => film.id == id)[0];

    localStorage.setItem("clicked film", JSON.stringify(film));

    window.location.href = "filmDescription.html";
  }
}

const films = new Films(+localStorage.getItem("maxPagesOnScreen") || 8);
