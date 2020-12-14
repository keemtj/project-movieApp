// eslint about api key properties
/* eslint-disable camelcase */
const BASE_URL = "https://api.themoviedb.org/3";
const POSTER_PATH = "https://image.tmdb.org/t/p/w780";

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
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
  );
  const { results } = await response.json();
  console.log(results);

  results.forEach((movie) => {
    const { poster_path, title, vote_average } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${POSTER_PATH + poster_path}" alt="poster" />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    `;

    main.appendChild(movieEl);
  });

  return results;
};

getMovies();
