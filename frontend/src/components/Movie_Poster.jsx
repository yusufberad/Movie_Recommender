

function Movie_Poster({ movie }) {
  return (
    <div className="movie-poster">
        <img className="w-64 aspect-[3/5]" src={movie[1]} alt={movie[0]} />
    </div>
  );
}


export default Movie_Poster;