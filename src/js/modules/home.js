const homePageDiv1 = document.querySelector(".div1");
const homePageDiv2 = document.querySelector(".div2");
const homePageDiv3 = document.querySelector(".div3");
const titleContainer = document.querySelector(".title-container");
const yearContainer = document.querySelector(".year-container");
const countryContainer = document.querySelector(".country-container");
const genresContainer = document.querySelector(".genres-container");
const buttonContainer = document.querySelector(".button-container");
let homePageMovies = [];

export async function getHomePage() {
  try {
    const response = await fetch(
      "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1",
      {
        method: "GET",
        headers: {
          "X-API-KEY": "8a08d4f7-66e2-4e35-a1e3-4e977e919e37",
          "Content-Type": "application/json",
        },
      }
    );
    const responseJson = await response.json();
    homePageMovies = responseJson.items;
    showHomePage();
  } catch (error) {
    homePageDiv1.innerHTML = `Кажется, что-то пошло не так: ${error.message}`;
  }
}

function showHomePage() {
  homePageDiv2.style.backgroundImage = `url(${homePageMovies[0].posterUrlPreview})`;
  const title = document.createElement("h1");
  title.textContent = `${homePageMovies[0].nameRu}`;
  title.className = "home-page__title";
  const year = `Год выпуска: ${homePageMovies[0].year}`;
  const countries = `${homePageMovies[0].countries
    .map((country) => `${country.country}`)
    .join(", ")}`;
  const genres = `${homePageMovies[0].genres
    .map((genre) => `${genre.genre}`)
    .join(", ")}`;
  const linkButton = document.createElement("a");
  linkButton.textContent = "Смотреть";
  linkButton.className = "home-page__watch-button";
  linkButton.setAttribute(
    "href",
    `https://www.kinopoisk.ru/film/${homePageMovies[0].kinopoiskId}/`
  );
  linkButton.setAttribute("target", "blank");
  titleContainer.append(title);
  yearContainer.append(year);
  countryContainer.append(countries);
  genresContainer.append(genres);
  buttonContainer.append(linkButton);
  const description = document.createElement("p");
  description.textContent = `${homePageMovies[0].description}`;
  description.className = "home-page__description";
  homePageDiv3.append(description);
}

/*
startHomePageRotation();
function renderMovie(movie) {
  movieContainer.innerHTML = ""; // Очищаем предыдущий контент
  const movieElement = createMovieElement(movie); // Создаем элемент фильма
  movieContainer.appendChild(movieElement); // Добавляем фильм в контейнер
}
//Ф-ия запуска показов фильмов через интревал
function startMovieRotation() {
  setInterval(() => {
    currentMovieIndex = (currentMovieIndex + 1) % movies.length; // Увеличиваем индекс и обнуляем
    renderMovie(movies[currentMovieIndex]); // Рендерим новый фильм
  }, 100000); // Каждые 10 секунд
}
*/
