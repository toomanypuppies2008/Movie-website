const seriesContainer = document.querySelector(".series-page__content");
const seriesArrow_buttonNext = document.querySelector(
  ".seriesArrow_buttonNext"
);
const seriesArrow_buttonPrev = document.querySelector(
  ".seriesArrow_buttonPrev"
);
let series = [];
let offset = 0; /* Переменная начальной точки отсчета фильмов */
let limit = 5; /* Переменная лимита фильмов за раз*/

/* Функция получения данных о фильмах с api */
export async function getSeries() {
  try {
    const response = await fetch(
      "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_TV_SHOWS&page=1",
      {
        method: "GET",
        headers: {
          "X-API-KEY": "8a08d4f7-66e2-4e35-a1e3-4e977e919e37",
          "Content-Type": "application/json",
        },
      }
    );
    const responseJson = await response.json();
    series = responseJson.items;
    console.log(series);
    renderSeries(offset, limit);
  } catch (error) {
    document.querySelector(
      ".series-page__title"
    ).innerHTML = `Кажется, что-то пошло не так: ${error.message}`;
    seriesArrow_buttonNext.style.display = "none";
    const image = document.createElement("img");
    image.style.margin = "0 auto";
    image.src =
      "src/img/popular/foni-papik-pro-8htj-p-kartinki-oshibka-na-prozrachnom-fone-25.png";
    seriesContainerContainer.append(image);
  }
}

/* Функция визуализации каждых последующих или предыдущих пяти фильмов */
function renderSeries(minIndex, maxIndex) {
  for (let i = minIndex; i < maxIndex; i++) {
    let movieWrapper = document.createElement("div");
    movieWrapper.classList.add("series-page__content-item");
    let image = document.createElement("img");
    image.classList.add("series-page__movie-image");
    image.src = `${series[i].posterUrlPreview}`;
    image.alt = `${series[i].nameRu}`;
    let p1 = document.createElement("p");
    p1.classList.add("series-page__movie-info");
    p1.textContent = `${series[i].nameRu} (${series[i].year})`;
    let p2 = document.createElement("p");
    p2.classList.add("series-page__movie-genres");
    p2.textContent = `${series[i].genres
      .map((genre) => `${genre.genre}`)
      .join(", ")}`;
    const buttonLink = document.createElement("a");
    buttonLink.textContent = "Смотреть";
    buttonLink.className = "series-page__watch-button";
    buttonLink.setAttribute(
      "href",
      `https://www.kinopoisk.ru/film/${series[i].kinopoiskId}/`
    );
    buttonLink.setAttribute("target", "blank");
    movieWrapper.append(image, p1, p2, buttonLink);
    seriesContainer.append(movieWrapper);
  }
}

/* Функции видимости и переключения кнопок 'следующая-предыдущая страницы'*/
seriesArrow_buttonNext.addEventListener("click", nextSeries);
seriesArrow_buttonPrev.addEventListener("click", previousSeries);
seriesArrow_buttonPrev.style.display = "none";

function nextSeries() {
  seriesContainer.innerHTML = "";
  offset = offset + limit;
  renderSeries(offset, offset + limit);
  seriesArrow_buttonPrev.style.display = "block";
  if (offset == 15) {
    seriesArrow_buttonNext.style.display = "none";
  }
}

function previousSeries() {
  seriesContainer.innerHTML = "";
  offset = offset - limit;
  renderSeries(offset, offset + limit);
  if (offset == 0) {
    seriesArrow_buttonPrev.style.display = "none";
  }
  if (offset < 15) {
    seriesArrow_buttonNext.style.display = "block";
  }
}
