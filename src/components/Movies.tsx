import { SquarePen } from 'lucide-react';
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

const Movies = () => {
  const nav = useNavigate();
  const [movies, setMovies] = useState([]);
  const {setId} = useContext(StoreContext);

 
  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      const fetchedMovies = response.data.movies;
      if (fetchedMovies.length > 0) {
        setMovies(fetchedMovies); 
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };


  useEffect(() => {
    fetchMovies();
  }, []); 

  
  const handleDelete = async (id: any) => {
    try {
      const response = await axios.delete(`http://localhost:3000/movie/${id}`);
      if(response.data.success) {
        
        setMovies(prevMovies => prevMovies.filter(movie => movie._id !== id));
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };


  return (
    <div className="px-16">
      <h1 className="text-3xl my-6 font-semibold">The best movie reviews site!</h1>
      <input 
        type="text" 
        placeholder="Search for your favourite movie" 
        className="border placeholder:text-gray-400 px-6 py-3 w-[30rem] outline-gray-400" 
      />
      <div className="mt-12 flex flex-wrap gap-6">
        {movies.map((item, index) => (
          <div className="bg-gray-300 w-[27rem] h-48 relative" key={index}>
            <div className="p-10">
              <h1 className="font-medium text-xl">{item.name}</h1>
              <p className="italic my-3 text-lg">Released: {new Date(item.releaseDate).toLocaleDateString('en-GB')}</p>
              {item.averageRating !== null && <p className="font-bold text-lg">Rating: {item.averageRating}/10</p>}
              
            </div>
            <button 
              className="bg-white border text-xs text-violet-600 font-medium px-3 py-1 rounded-md absolute bottom-3 right-28" 
              onClick={() => {nav(`/reviews/${item._id}`), setId(item._id)}}
            >
              Reviews
            </button>
            <span className='absolute bottom-3 right-16 text-gray-600'>
              <SquarePen />
            </span>
            <span 
              className='absolute bottom-3 right-6 text-gray-600' 
              onClick={() => handleDelete(item._id)}
            >
              <Trash />
            </span>
          </div>    
        ))}
      </div>
    </div>
  );
}

export default Movies;
