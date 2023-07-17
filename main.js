function start() {
  if (localStorage.getItem("main")) {
    films.render(MAIN_URL);
    localStorage.removeItem("main");
    return;
  }
  if (localStorage.getItem("searchUrl")) {
    films.render(localStorage.getItem("searchUrl"));
    localStorage.removeItem("searchUrl");
    return;
  }
  films.render(history.state ?? MAIN_URL);
}

start();
