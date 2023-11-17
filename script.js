
const apiKey = 'd9ac7a3295a00b78b9fb099bf4307409';
let currentMovieIndex = 0;

const genresSelect = document.getElementById('genres');
const playBtn = document.getElementById('playBtn');
const moviePoster = document.getElementById('moviePoster');
const movieText = document.getElementById('movieText');
const likeBtn = document.getElementById('likeBtn');
const likeordislike=document.getElementById('likeOrDislikeBtns');

// Fetch and populate genres
function fetchGenres() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
  xhr.send();
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      data.genres.forEach((genre) => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genresSelect.appendChild(option);
      });
    } else {
      console.error('Error fetching genres:', xhr.statusText);
    }
  };
}

fetchGenres();

// Add an event listener to the "Search" button
playBtn.addEventListener('click', () => {
  const selectedGenre = genresSelect.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`);
  xhr.send();
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      if (data.results.length > 0) {
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        displayMovieDetails(randomMovie);
      } else {
        movieText.textContent = 'No movies found for the selected genre.';
      }
    } else {
      console.error('Error fetching movie:', xhr.statusText);
    }
  };
});

likeBtn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    const selectedGenre = genresSelect.value;
    xhr.open('GET', `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`);
    xhr.send();
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (data.results.length > 0) {
          if (currentMovieIndex < data.results.length - 1) {
            currentMovieIndex++;
          } else {
            currentMovieIndex = 0;
          }
          const nextMovie = data.results[currentMovieIndex];
          displayMovieDetails(nextMovie);
        } else {
          movieText.textContent = 'No movies found for the selected genre.';
        }
      } else {
        console.error('Error fetching movie:', xhr.statusText);
      }
    };
  });

function displayMovieDetails(movie) {
    likeordislike.style.display='block';

  moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">`;
  movieText.innerHTML = `<h2>${movie.title}</h2><p>${movie.overview}</p>`;
}
