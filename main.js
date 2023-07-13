// if (+localStorage.getItem("main")) {
//   console.log("MAIN!");
// }
// films.render(history.state ?? MAIN_URL);

function start() {
  if (+localStorage.getItem("main")) {
    films.render(MAIN_URL);
    localStorage.removeItem("main");
    return;
  }
  films.render(history.state ?? MAIN_URL);
}

start();
