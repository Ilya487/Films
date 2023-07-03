class FilmPage {
  render() {
    ROOT__FILM__PAGE.innerHTML = ``;

    const film = JSON.parse(localStorage.getItem("clicked film"));

    document.title = film.name;

    if (!film) return;

    const trailers = this.drawTrailers(film.videos);

    const html = `
        <div class="container">
        <div class="film-page__header">
        <div class="film-page__header-inner">
            <div class="film-page__header-left">
            <div class="film-page__header-left-img">
                <img
                src="${film.poster.url}"
                alt=""
                />
            </div>
            <p class="film-page__header-left-rating">imdb <span>${
              film.rating.imdb
            }</span></p>
            </div>
            <div class="film-page__header-right">
            <h2 class="film-page__header-right-title">${film.name}</h2>
            <p class="film-page__header-right-description">
                ${film.description}
            </p>
            <div class="film-page__header-right-about">
                <h3 class="film-page__header-right-subtitle">О фильме</h3>
                <div class="film-page__header-right-about-line">
                <span>Старана</span> ${film.countries
                  .map((item) => item.name)
                  .join(", ")}
                </div>
                <div class="film-page__header-right-about-line">
                <span>Год</span> ${film.year}
                </div>
                <div class="film-page__header-right-about-line">
                <span>Продолжительность</span> ${films.parsingMovieLength(
                  film.movieLength
                )}
                </div>
                <div class="film-page__header-right-about-line">
                <span>Возраст</span> ${film.ageRating} +
                </div>
                
                ${
                  film.budget
                    ? `<div class="film-page__header-right-about-line">
                        <span>Бюджет</span>${film.budget?.value.toLocaleString()}${
                        film.budget?.currency
                      }</div>`
                    : ""
                }

                ${
                  film.fees
                    ? `<div class="film-page__header-right-about-line">
                        <span>Сборы в мире</span>${film.fees.world.value.toLocaleString()}${
                        film.fees.world.currency
                      }</div>`
                    : ""
                }
                
                
            </div>
            </div>
        </div>
        </div>
        ${trailers}
    </div>
    `;

    ROOT__FILM__PAGE.innerHTML = html;

    this.setEventOnTrailersList(film.videos.trailers);
  }

  drawTrailers({ trailers }) {
    if (trailers.length == 0) return;

    trailers = trailers.filter((trailer) => trailer.url.includes("youtube"));

    let listOfTrailers = `
        <ul class="film-page__trailers-list">
        `;
    trailers.forEach((trailer) => {
      listOfTrailers += `
            <li class="film-page__trailers-item">${trailer.name}</li>
        `;
    });
    listOfTrailers += "</ul>";

    return `
    <div class="film-page__trailers">
          <div class="film-page__trailers-selector">
            <button class="film-page__btn" onclick="filmPage.openTrailersList()">
              <span>
                ${trailers[0].name}
              </span>
              <svg viewBox="0 0 16 16">
                <path
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708 L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                ></path>
              </svg>
            </button>
            ${listOfTrailers}
          </div>

          <iframe
            class="film-page__trailer"
            src="${this.validationTrailerURL(trailers[0].name, trailers)}"
            allow="picture-in-picture; web-share; gyroscope"
            allowfullscreen
          ></iframe>
        </div>
    `;
  }

  openTrailersList() {
    const trailersSelector = document.querySelector(
      ".film-page__trailers-selector"
    );
    trailersSelector.classList.toggle("film-page__trailers-selector--active");
  }

  setEventOnTrailersList(trailers) {
    const listOfTrailers = document.querySelector(".film-page__trailers-list");

    listOfTrailers.addEventListener("click", (e) => {
      const listOfTrailersItem = e.target.closest(".film-page__trailers-item");

      if (listOfTrailersItem) {
        this.setTreiler(listOfTrailersItem.textContent, trailers);
      }
    });
  }

  setTreiler(trailerName, trailers) {
    this.openTrailersList();

    const trailresBtnText = document.querySelector(".film-page__btn span");
    trailresBtnText.textContent = trailerName;

    const trailersPlayer = document.querySelector(".film-page__trailer");
    const container = trailersPlayer.parentElement;
    trailersPlayer.remove();

    const trailerURL = this.validationTrailerURL(trailerName, trailers);

    trailersPlayer.setAttribute("src", trailerURL);

    container.appendChild(trailersPlayer);
  }

  validationTrailerURL(trailerName, trailers) {
    let trailerUrl = trailers.filter(
      (trailer) => trailer.name == trailerName
    )[0].url;

    if (trailerUrl.includes("embed")) return trailerUrl;

    if (trailerUrl.includes("/v/")) return trailerUrl.replace("/v/", "/embed/");

    if (trailerUrl.includes("watch?v="))
      return trailerUrl.replace("watch?v=", "/embed/");
  }
}

const filmPage = new FilmPage();
filmPage.render();

document.addEventListener("click", (e) => {
  if (e.target.closest(".film-page__trailers-selector")) return;

  document
    .querySelector(".film-page__trailers-selector")
    .classList.remove("film-page__trailers-selector--active");
});
