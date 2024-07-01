import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Movie_Poster from "../components/Movie_Poster";

function Movie() {
    let { id } = useParams();
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    let [list , setList] = useState([]);
    let [poster, setPoster] = useState('');
    let [details, setDetails] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/items/" + id);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setData(data);
                setList(data.similar_items);
                setPoster(data.poster);
                setDetails(data.details);
                console.log(data);}
            catch (error) {
                setError(error.message);
                console.log(error);
            } finally {
                setLoading(false);
            }
                 
        };
        fetchData();
    },[]);
  return (
    <div className="px-24 py-5 flex flex-col gap-24">
      <div className="flex flex-row">
        <img src={poster} alt="poster" />
        <div className="flex flex-col">
          <h1 className="text-2xl" >{data.title}</h1>
          <p>{details}</p>
        </div>
      </div>  
      <div className="flex justify-center items-center">
      <ul className="grid grid-cols-5 gap-24" >
        {list.map((item, index) => (
            <Movie_Poster key={index} movie={item} />
        ))}
      </ul>
      </div>
    </div>
  );
}


export default Movie;