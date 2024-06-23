import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Movie() {
    let { id } = useParams();
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    let [list , setList] = useState([]);
    let [poster, setPoster] = useState('');
    
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
    <div>
      <h1>{id}</h1>
      <img src={poster} alt="" />     
      <ul>
        {list.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}


export default Movie;