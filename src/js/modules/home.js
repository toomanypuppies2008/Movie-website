const infoContainer = document.querySelector(".info-container");
const posterContainer = document.querySelector(".poster-container");
const descriptionContainer = document.querySelector(".description-container");
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
          "X-API-KEY": "dd146e83-6098-4c58-bea6-a52186942de2",
          "Content-Type": "application/json",
        },
      }
    );
    const responseJson = await response.json();
    homePageMovies = responseJson.items;
    showHomePage();
  } catch (error) {
    infoContainer.innerHTML = `Кажется, что-то пошло не так: ${error.message}`;
  }
}

function showHomePage() {
  posterContainer.style.backgroundImage = `url(${homePageMovies[0].posterUrlPreview})`;
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
  const description = document.createElement("p");
  description.textContent = `${homePageMovies[0].description}`;
  description.className = "home-page__description";
  titleContainer.append(title);
  yearContainer.append(year);
  countryContainer.append(countries);
  genresContainer.append(genres);
  descriptionContainer.append(description);
  buttonContainer.append(linkButton);
}
