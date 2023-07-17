const width800MediaQuery = matchMedia("(max-width: 800px)");
const width575MediaQuery = matchMedia("(max-width: 575px)");

width800MediaQuery.addEventListener("change", (e) => {
  if (e.matches) films.setCountPagesOnScreen(6);
  else films.setCountPagesOnScreen(8);
});
width575MediaQuery.addEventListener("change", (e) => {
  if (e.matches) films.setCountPagesOnScreen(4);
  else films.setCountPagesOnScreen(6);
});
