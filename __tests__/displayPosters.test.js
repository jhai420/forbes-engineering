global.fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { getByText } = require('@testing-library/dom');
const { JSDOM }= require("jsdom");
require('@testing-library/jest-dom/extend-expect');

const html = fs.readFileSync(path.resolve(__dirname, '../views/index.html'), 'utf8');
const displayPosters = require('../assets/js/displayPosters');

let dom;

describe('Main page rendering', () => {

  beforeEach(() => {
    dom = new JSDOM(html);
    // document = dom.window.document
    document.body.innerHTML = `
      <div class="container">
      <header>
          <h1>Batman Films</h1>
      </header>
      <div id="posters" class="poster-grid"></div>
      <div id="pagination" class="pages"></div>
      </div>
      <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <div id="modal-img"></div>
          </div>
      </div>
    `;
  })

  it('renders a heading element', () => {
    expect(document.querySelector('h1')).not.toBeNull()
    expect(getByText(document.body, 'Batman Films')).toBeInTheDocument()
  })

  it('renders poster grid', () => {
    const postersGrid = document.querySelector('#posters');
    expect(postersGrid).not.toBeNull()
    expect(postersGrid).toBeEmptyDOMElement()
    expect(document.body).toContainElement(postersGrid)
  })

  it('displays 10 poster images', () => {

    const mockData = [
      {
          "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
      },
      {
          "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
      },
      {
          "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"
      },
      {
          "Poster": "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"
      },
      {
          "Poster": "https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
      },
      {
          "Poster": "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
      },
      {
          "Poster": "https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"
      },
      {
          "Poster": "https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
      },
      {
          "Poster": "https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg"
      },
      {
          "Poster": "https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
      }
    ]
        
    const postersGrid = document.getElementById("posters");
    const modalImg = document.querySelector("#modal-img");
    displayPosters(mockData, postersGrid, modalImg);

    const posterDivs = document.querySelectorAll('.poster-div');
    expect(posterDivs.length).toBe(10);
  })

});