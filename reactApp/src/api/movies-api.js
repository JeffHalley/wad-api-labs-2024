export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=65d37221e2d0cea6fc1ebbc958e3ce8c&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };