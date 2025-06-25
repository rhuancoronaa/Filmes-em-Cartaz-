// Chave da API do TheMovieDB
const API_KEY = 'd29e79bb675e164fc1f28decd659e21c'; 

// URL base que traz os filmes em cartaz no momento
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`;

// Seleciona o container onde os filmes serão exibidos
const moviesContainer = document.getElementById('moviesContainer');

// Campo de input de busca do usuário
const searchInput = document.getElementById('searchInput');

// Função assíncrona que busca filmes a partir de uma URL e envia os resultados para exibição
async function fetchMovies(url) {
  const response = await fetch(url); // Faz a requisição para a API
  const data = await response.json(); // Converte a resposta para JSON
  displayMovies(data.results); // Exibe os filmes retornados
}

// Função que renderiza os cards de filmes na página
function displayMovies(movies) {
  moviesContainer.innerHTML = ''; // Limpa os resultados anteriores

  movies.forEach(movie => {
    const movieEl = document.createElement('div'); // Cria um novo elemento para o card
    movieEl.classList.add('movie-card'); // Adiciona a classe de estilo

    // Define o conteúdo do card com imagem, título, nota e link para detalhes
    movieEl.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Nota: ${movie.vote_average}</p>
      <a href="detalhes.html?id=${movie.id}">Ver detalhes</a>
    `;

    // Adiciona o card ao container principal
    moviesContainer.appendChild(movieEl);
  });
}

// Adiciona um ouvinte de evento para buscar filmes conforme o usuário digita
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase(); // Pega o valor da busca em letras minúsculas

  // Faz a requisição para a API de busca da TMDB com o termo pesquisado
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`)
    .then(res => res.json()) // Converte a resposta para JSON
    .then(data => displayMovies(data.results)); // Exibe os filmes encontrados
});

// Busca inicial: carrega os filmes em cartaz ao abrir a página
fetchMovies(API_URL);
