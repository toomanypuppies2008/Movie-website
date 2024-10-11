export function movies() {
  const arrowRight = document.querySelector(".movie-arrow-right");
  const arrowLeft = document.querySelector(".movie-arrow-left");
  const movieList = document.querySelector(".movie-movie-list");

  let offset = 0;
  const step = 20;
  let count = 0;

  arrowRight.addEventListener("click", () => {
    // styles
    const offsetLimit = -(count - 4) * step;
    const blockRightArrow = -3 * step;
    if (offset === blockRightArrow) {
      arrowRight.classList.add("arrow-inactive");
    }

    // slider
    if (offset !== offsetLimit) {
      const newOffset = offset - step;
      movieList.style.transform = `translateX(${newOffset}%)`;
      offset = newOffset;

      arrowLeft.classList.remove("arrow-inactive");
    }
  });

  arrowLeft.addEventListener("click", () => {
    //styles
    if (offset === -25) {
      arrowLeft.classList.add("arrow-inactive");
    }

    //slider
    if (offset < 0) {
      const newOffset = offset + step;
      movieList.style.transform = `translateX(${newOffset}%)`;
      offset = newOffset;

      arrowRight.classList.remove("arrow-inactive");
    }
  });

  const displayFilms = (list) => {
    movieList.innerHTML = "";
    list.forEach((film) => {
      const filmDiv = document.createElement("div");
      filmDiv.className = "movie-movie-list-item";
      filmDiv.innerHTML = `
          <img class="movie-movie-list-item-img" src="${
            film?.posterUrlPreview
          }" alt="" />
          <span class="movie-movie-list-item-title">${
            film?.nameRu ? film?.nameRu : ""
          }</span>
          <button class="movie-movie-list-item-button">Смотреть</button>
        `;
      movieList.appendChild(filmDiv);
    });
  };

  const fetchData = async () => {
    const result = await fetch(
      "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1",
      {
        method: "GET",
        headers: {
          "X-API-KEY": "2b815b33-2426-41f3-a0cf-35d938bcbb00",
          "Content-Type": "application/json",
        },
      }
    );
    const filmsList = await result.json();
    displayFilms(filmsList.items);
    count = filmsList.items.length;
  };

  fetchData();
}
