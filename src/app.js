// API
const API_KEY = "3ef4c5fa61958e5d202034dc4174a2d6";
const BASE_URL = "https://api.themoviedb.org/3";

const page = 1;
const MOVIE_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
const NETFLIX_ORIGINAL_URL = `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&page=${page}&timezone=Asia%2FSeoul&with_networks=213&include_null_first_air_dates=false`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w780";

// DOM
const main = document.querySelector("main");

const getClassByRate = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

const getMovies = async () => {
  const response = await fetch(NETFLIX_ORIGINAL_URL);
  const { results } = await response.json();
  console.log(results);

  results.forEach((movie) => {
    /* eslint-disable camelcase */
    console.log(movie);
    const { name, title, poster_path, vote_average } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${IMAGE_URL + poster_path}" alt="poster" />
    <div class="movie-info">
      <h3>${title ?? name}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    `;

    main.appendChild(movieEl);
  });

  return results;
};

getMovies();
