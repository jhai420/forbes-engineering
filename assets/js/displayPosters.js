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

module.exports = displayPosters;