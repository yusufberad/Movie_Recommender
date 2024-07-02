import { useEffect, useState } from "react";


function Movie_Poster({ movie }) {
  const [poster, setPoster] = useState('');

  useEffect(() =>{
    
    const fetchPoster = async (movie) => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie}?language=tr-TR`, {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + import.meta.env.VITE_REACT_TMDB_API_TOKEN
          }
        });
        const data = await response.json();
        setPoster(`https://image.tmdb.org/t/p/w500${data.poster_path}`);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchPoster(movie)
  },[movie]);
  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50">
      <div className="group h-96 w-96 [perspective:1000px]">
        <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-300 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)">
          <div className="absolute inset-0">
            <img className="w-64 aspect-[3/5]" src={poster} alt={movie} />
          </div>
        </div>
      </div>
        
    </div>
  );
}


export default Movie_Poster;