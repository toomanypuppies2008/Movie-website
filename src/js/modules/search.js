const apiRecommendedUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const apiKey = "dd146e83-6098-4c58-bea6-a52186942de2";

const recommendTitle = document.querySelector('.recommend h2.recommend__title');
const recommendItems = document.querySelector('.recommend__items');
const recommendButton = document.querySelector(".recommend__button");
const scrollToTopButton = document.querySelector(".search-page__scroll-to-top");


let allMovies = [];
let currentIndex = 0;
const moviesPerPage = 10;

//Универсальная ф-я запроса АПИ
async function fetchFromApi(url) {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        const dataKeys = ['items', 'films', 'genres'];
        const data = dataKeys.find(key => Array.isArray(responseData[key]) && responseData[key].length > 0);

        if (!data) {
            throw new Error("Ничего не найдено");
        }

        return responseData[data];

    } catch (error) {
        if (error.message.includes("Ошибка HTTP")) {
            recommendTitle.innerHTML = `Ошибка при запросе к API: ${error.message}`;
        } else {
            recommendTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
        }
        return [];
    }
}

//Ф-ия получения рекомендаций
export async function getRecommendMovies() {
    try {
        const data = await fetchFromApi(apiRecommendedUrl);
        allMovies = data;
        recommendItems.innerHTML = '';
        renderMovies(allMovies);
        recommendTitle.textContent = "Рекомендуем";
    } catch (error) {
        recommendTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
    }
}


//ф-ия рендера карточек
export function renderMovies(movies) {
    const moviesToShow = movies.slice(currentIndex, currentIndex + moviesPerPage);

    moviesToShow.forEach(movie => {
        const movieElement = createMovieElement(movie);
        recommendItems.appendChild(movieElement);
    });

    currentIndex += moviesPerPage;

    toggleButtonVisibility(currentIndex < movies.length);
}

//Ф-ия создания карточки фильма
function createMovieElement(movie) {
    const movieElement = document.createElement("a");
    movieElement.classList.add("recommend__item");

    const movieType = movie.type === 'FILM' ? 'Фильм' : (movie.type === 'TV_SERIES' ? 'Сериал' : 'Шоу');

    movieElement.innerHTML = `
        <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
        <h3 class="recommend__item-title">${movie.nameRu}</h3>
        <div class="recommend__item-info">
            <div class="recommend__item-description">
                <p class="recommend__item-year">${movie.year},</p>
                <p class="recommend__item-type">${movieType}</p>
            </div>
            <p class="recommend__item-genre">${movie.genres.map(genre => `${genre.genre}`).join(', ')}</p>
        </div>
    `;
    return movieElement;
}

//Ф-ия показа кнопок
function toggleButtonVisibility(isVisible) {
    recommendButton.style.display = isVisible ? 'block' : 'none';
    scrollToTopButton.style.display = isVisible ? 'none' : 'block';
}

//Ф-ия  инициализации обработчиков
export function initEventListeners() {
    recommendButton.addEventListener("click", () => renderMovies(allMovies));

    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        const isVisible = window.scrollY > 600;
        scrollToTopButton.style.display = isVisible ? 'block' : 'none';
    });
}