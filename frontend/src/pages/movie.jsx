import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Movie_Poster from "../components/Movie_Poster";
import Loading_Screen from "../components/Loading_Screen";

function Movie() {
    let { id } = useParams();
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    let [list , setList] = useState([]);
    let [poster, setPoster] = useState('');
    let [details, setDetails] = useState([]);
    
    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://127.0.0.1:8000/items/${id}`);
                data = await response.json();
                setList(data["similar_items"]);
              } catch (error) {
                setError(error);
                console.log(error);
              }
              setLoading(false);
            }
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=tr-TR`, {
                    headers: {
                        'accept': 'application/json',
                        'authorization': 'Bearer ' + import.meta.env.VITE_REACT_TMDB_API_TOKEN
                    }
                });
                const data = await response.json();
                setData(data);
                setPoster(`https://image.tmdb.org/t/p/w500${data.poster_path}`);
                setDetails(data.overview);
            }
            catch (error) {
                setError(error);
                console.log(error);
            }
            setLoading(false);
        }
            fetchData();
            fetchSimilar();
    },[id]);
    
  return (
    <>
    {loading && <Loading_Screen />}
    <div className="px-24 py-5 flex flex-col gap-24">
      <div className="flex flex-row">
        <img src={poster} alt="poster" className="rounded-md w-96"/>
        <div className="flex flex-col py-10 px-5">
          <h1 className="text-6xl font-bold" >{data.title}</h1>
          <p>{details}</p>
        </div>
      </div>  
      <div className="flex justify-center items-center">
      <ul className="grid grid-cols-5 gap-24" >
        {list.map((item, index) => (
          <li key={index}>
            <Movie_Poster movie={item}/>
          </li>
        ))}
      </ul>
      </div>
    </div>
    </>
  );
}


export default Movie;