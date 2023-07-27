const IMAGES_URL = 'https://api.nomoreparties.co';
const HTTP_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const SHORT_FILM_DURATION = 40;

export const VALIDATION = {
  username: {
    pattern: '^[\\sa-zA-Zа-яА-ЯёЁ-]+$',
    message: 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
  },
  email: {
    pattern: '^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$',
    message: 'Некорректный Email-адрес',
  },
};

export const normalizeMovies = (movies) => {
  return movies
    .map((movie) => ({
      country: movie.country || 'unknown',
      director: movie.director || 'unknown',
      duration: movie.duration || 60,
      year: movie.year || 2000,
      description: movie.description || 'unknown',
      image: `${IMAGES_URL}/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${IMAGES_URL}/${movie.image.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU || 'unknown',
      nameEN: movie.nameEN || 'unknown',
    }))
    .map((movie) =>
      HTTP_REGEX.test(movie.trailerLink)
        ? movie
        : { ...movie, trailerLink: movie.image }
    );
};

export const filterMovies = (movies, keyWord, isShort) => {
  const word = keyWord.toLowerCase().trim();

  const searchedMovies = movies.filter((movie) => {
    const ruName = movie.nameRU && movie.nameRU.toLowerCase().trim();
    const enName = movie.nameEN && movie.nameEN.toLowerCase().trim();
    return ruName.match(word) || (enName && enName.match(word));
  });

  if (isShort) {
    return searchedMovies.filter(
      (movie) => movie.duration <= SHORT_FILM_DURATION
    );
  }

  return searchedMovies;
};
