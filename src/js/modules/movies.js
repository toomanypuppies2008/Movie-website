const moviesContainer = document.querySelector(".movies-page__content");
const moviesArrow_buttonNext = document.querySelector(
  ".moviesArrow_buttonNext"
);
const moviesArrow_buttonPrev = document.querySelector(
  ".moviesArrow_buttonPrev"
);
let movies = [];
let offset = 0; /* Переменная начальной точки отсчета фильмов */
let limit = 5; /* Переменная лимита фильмов за раз*/

/* Функция получения данных о фильмах с api */
export async function getMovies() {
  try {
    const response = await fetch(
      "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1",
      {
        method: "GET",
        headers: {
          "X-API-KEY": "8a08d4f7-66e2-4e35-a1e3-4e977e919e37",
          "Content-Type": "application/json",
        },
      }
    );
    const responseJson = await response.json();
    movies = responseJson.items;
    console.log(movies);
    renderMovies(offset, limit);
  } catch (error) {
    document.querySelector(
      ".movies-page__title"
    ).innerHTML = `Кажется, что-то пошло не так: ${error.message}`;
    moviesArrow_buttonNext.style.display = "none";
    const image = document.createElement("img");
    image.style.margin = "0 auto";
    image.src =
      "src/img/popular/foni-papik-pro-8htj-p-kartinki-oshibka-na-prozrachnom-fone-25.png";
    moviesContainer.append(image);
  }
}

/* Функция визуализации каждых последующих или предыдущих пяти фильмов */
function renderMovies(minIndex, maxIndex) {
  for (let i = minIndex; i < maxIndex; i++) {
    let movieWrapper = document.createElement("div");
    movieWrapper.classList.add("movies-page__content-item");
    let image = document.createElement("img");
    image.classList.add("movies-page__movie-image");
    image.src = `${movies[i].posterUrlPreview}`;
    image.alt = `${movies[i].nameRu}`;
    let p1 = document.createElement("p");
    p1.classList.add("movies-page__movie-info");
    p1.textContent = `${movies[i].nameRu} (${movies[i].year})`;
    let p2 = document.createElement("p");
    p2.classList.add("movies-page__movie-genres");
    p2.textContent = `${movies[i].genres
      .map((genre) => `${genre.genre}`)
      .join(", ")}`;
    const buttonLink = document.createElement("a");
    buttonLink.textContent = "Смотреть";
    buttonLink.className = "movies-page__watch-button";
    buttonLink.setAttribute(
      "href",
      `https://www.kinopoisk.ru/film/${movies[i].kinopoiskId}/`
    );
    buttonLink.setAttribute("target", "blank");
    movieWrapper.append(image, p1, p2, buttonLink);
    moviesContainer.append(movieWrapper);
  }
}

/* Функции видимости и переключения кнопок 'следующая-предыдущая страницы'*/
moviesArrow_buttonNext.addEventListener("click", nextMovies);
moviesArrow_buttonPrev.addEventListener("click", previousMovies);
moviesArrow_buttonPrev.style.display = "none";

function nextMovies() {
  moviesContainer.innerHTML = "";
  offset = offset + limit;
  renderMovies(offset, offset + limit);
  moviesArrow_buttonPrev.style.display = "block";
  if (offset == 15) {
    moviesArrow_buttonNext.style.display = "none";
  }
}

function previousMovies() {
  moviesContainer.innerHTML = "";
  offset = offset - limit;
  renderMovies(offset, offset + limit);
  if (offset == 0) {
    moviesArrow_buttonPrev.style.display = "none";
  }
  if (offset < 15) {
    moviesArrow_buttonNext.style.display = "block";
  }
}
