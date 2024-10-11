import { movies } from "./modules/movies";

import {
  getRecommendMovies,
  initEventListeners,
} from "./modules/search";

import { getPopularMovies } from "./modules/popular";
import { initSeriesModule } from "./modules/series";
import { getMovies } from "./modules/home";

document.addEventListener("DOMContentLoaded", () => {
  const isSearchPage = document.querySelector(".search-page") !== null;

  if (isSearchPage) {
    initEventListeners();
    getRecommendMovies();
  } else {
    getMovies();
    getPopularMovies();
    initSeriesModule();
  }
});

movies();

window.addEventListener("resize", () => {
  updateItemsPerView();
  showNextItems();
});
