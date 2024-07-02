import { useState, useEffect } from "react";
import AutoComplete from "../components/AutoComplete";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/movie_list");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.movie_list);
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (value) => {
    setSelected(value);
  }

  const fetchId = async () => {
    console.log(selected);
    try {
      const response = await fetch(`http://127.0.0.1:8000/get_id/${selected}`)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      navigate(`/movie/${data.id}`);
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <div className="flex items-center justify-center flex-col w-full h-[100vh]">
      <div className="flex flex-row border-2 border-gray-400 rounded-md focus-within:scale-125 focus-within:transition-all focus-within:duration-500 duration-500">
        <AutoComplete options={data.movie_list} placeholder="Film Adı" value={selected} onChange={handleChange} />
        <button onClick={() => fetchId()} className="bg-red-500 rounded-r-[4px] py-2 px-4 w-1/4">Öner</button>
      </div>
    </div>
  );
}

export default Home;