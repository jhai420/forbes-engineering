/************ GLOBAL VARIABLES ************/
const POSTER_CACHE = {};
const TOTAL_RESULTS = 50
const RESULTS_PER_PAGE = 10;
let currentPage = 1;

/************ FUNCTIONS ************/

/**
 *
 * @param page
 *
 * Fetches posters from IMDB movie API according to the page.
 * Each fetch request is limited to 10 results.
 *
 */
function fetchPosters(page) {

  const poster_container = document.getElementById('posters');
  const modal_img = document.getElementById('modal-img');

  // If fetch request was made for the page before, then simply return posters from cache
  if (POSTER_CACHE[page]) return displayPosters(POSTER_CACHE[page], poster_container, modal_img);

  // Otherwise fetch data from the database according to the page
  fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=batman&page=${page}&type=movie&r=json`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "02dfad1700msh6bb9db66d5f2274p1d711fjsnabb1452a9a18",
      "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
    }
  })
  .then(response => response.json())
  .then(data => {
    // Store posters in cache 
    POSTER_CACHE[page] = data.Search;
    // Display posters on page
    displayPosters(data.Search, poster_container, modal_img);
  })
  .catch(err => {
    console.error(err);
  });

};

/**
 *
 * @param posterData
 * @param wrapper
 * @param modalImage
 *
 * Displays posters in the poster container from the page clicked. Adds
 * an event listener to the poster for modal to pop up on click.
 *
 */
 function displayPosters(posterData, wrapper, modalImage) {

  wrapper.innerHTML = "";

  posterData.forEach(movie => {
    const posterDiv = document.createElement('div');
    posterDiv.classList.add('poster-div');
    const poster = document.createElement('img');
    poster.src = movie.Poster;
    posterDiv.appendChild(poster);
    wrapper.appendChild(posterDiv);

    poster.addEventListener('click', function() {
      modalImage.innerHTML = "";
      const img = document.createElement('img');
      img.src = movie.Poster;
      modalImage.appendChild(img);

      const modal = document.getElementById("myModal");
      modal.style.display="block";
    });

  });

}

/**
 *
 * @param totalMovies
 * @param moviesPerPage
 *
 * Dynamically generates the number of pages according to the total
 * search results and the number of results to display per page.
 *
 */
 function setPages(totalMovies, moviesPerPage) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = "";

  let pageCount = Math.ceil(totalMovies / moviesPerPage)
  for (let i = 1; i <= pageCount; i++) {
    const btn = createButton(i);
    pagination.appendChild(btn);
  }
}

/**
 *
 * @param page
 *
 * Generates and returns button according to page number. Adds event 
 * listener to button to fetch posters according to page clicked.
 *
 */
 function createButton(page) {
  const btn = document.createElement('button');
  btn.innerText = page;

  if (currentPage === page) btn.classList.add('active');

  btn.addEventListener('click', function() {

    currentPage = page;
    fetchPosters(page);

    let previousBtn = document.querySelector('button.active');
    previousBtn.classList.remove('active');

    btn.classList.add('active');
  });

  return btn;
}

// Fetch the first page of posters
fetchPosters(currentPage);

// Set the number of pages according to the total results and results per page desired
setPages(TOTAL_RESULTS, RESULTS_PER_PAGE);

// When the user clicks on (x), close the modal
const exit_modal = document.getElementsByClassName("close")[0];
exit_modal.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
const modal = document.getElementById("myModal");
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

