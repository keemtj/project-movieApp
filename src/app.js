// API;
const API_KEY = "3ef4c5fa61958e5d202034dc4174a2d6";
const BASE_URL = "https://api.themoviedb.org/3";

const page = 1;
const show = "tv"; // tv, movie
const MOVIE_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
const NETFLIX_ORIGINAL_URL = `${BASE_URL}/discover/${show}?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&page=${page}&timezone=Asia%2FSeoul&with_networks=213&include_null_first_air_dates=false`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w780";

const SEARCH_API = `https://api.themoviedb.org/3/search/${show}?api_key=${API_KEY}&query=`;

let datas = [];

// DOM
const main = document.querySelector("main");
const nav = document.querySelector("nav");
const form = document.querySelector("form");
const search = document.querySelector(".search");
const back = document.querySelector(".back");
const tempEl = document.createElement("div");

const getClassByRate = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

const showMovies = (movies) => {
  if (!datas.length) {
    datas = [...movies];
    back.style.display = "none";
    nav.prepend(tempEl);
  } else {
    tempEl.remove();
    back.style.display = "block";
  }

  main.innerHTML = "";
  movies.forEach((movie) => {
    /* eslint-disable camelcase */
    const { name, title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${IMAGE_URL + poster_path}" alt=${title ?? name} />
    <div class="movie-info">
      <h3>${title ?? name}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>${title ?? name}</h3>
      <p>${overview}</p>
    </div>
    `;

    main.appendChild(movieEl);
  });
};

const getMovies = async (url) => {
  const response = await fetch(url);
  const { results } = await response.json();
  showMovies(results);
};

const getSearchMovies = (e) => {
  e.preventDefault();
  const searchValue = search.value;
  if (searchValue) {
    getMovies(SEARCH_API + searchValue);
    search.value = "";
  }
};

const goBack = () => {
  console.log("뒤로가기!");
  showMovies(datas);
  back.style.display = "none";
  nav.prepend(tempEl);
};

window.addEventListener("load", () => getMovies(NETFLIX_ORIGINAL_URL));
form.addEventListener("submit", getSearchMovies);
back.addEventListener("click", goBack);
