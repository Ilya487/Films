const API_KEY = "RHHEPC9-SS64ME3-NWWA14P-J990D4R";
const MAIN_URL =
  "https://api.kinopoisk.dev/v1.3/movie?selectFields=id%20name%20poster%20year%20genres%20budget.value%20budget.currency%20fees.world.value%20fees.world.currency%20countries.name%20ageRating%20movieLength%20rating.imdb%20description%20videos.trailers.url%20videos.trailers.name&page=1&limit=15&type=movie&top250=%21null";
const templateForSearch =
  "https://api.kinopoisk.dev/v1.3/movie?selectFields=id%20name%20poster%20year%20genres%20budget.value%20budget.currency%20fees.world.value%20fees.world.currency%20countries.name%20ageRating%20movieLength%20rating.imdb%20description%20videos.trailers.url%20videos.trailers.name&page=1&limit=15&type=movie&poster=%21null";

const ROOT__FILMS = document.querySelector(".films");
const ROOT__FILM__PAGE = document.querySelector(".film-page");
