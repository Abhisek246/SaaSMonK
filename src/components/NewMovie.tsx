import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewMovie = () => {
  const [data, setData] = useState({
    name: '',
    releaseDate: '',
  });
  const nav = useNavigate();

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target; 
    setData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
    console.log(value)
  };

  const handleSubmit = async (event: { preventDefault: () => void; })=>{
    event.preventDefault();
    const response = await axios.post('http://localhost:3000/movie', data);

    if(response.data.success){
      console.log(response.data.message);
      nav('/')
    }else{
      console.log(response.data.message);
    }
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-semibold">Add new movie</h1>
      <form onSubmit={handleSubmit} className="mt-10 relative">
        <input
          type="text"
          placeholder="Name"
          className="border px-4 py-2 placeholder:text-gray-400 w-96 outline-gray-400"
          value={data.name}
          name="name"
          onChange={handleChange}
        /><br /><br />
        
        <input
          type="date"
          className="border px-4 py-2 w-96 outline-gray-400"
          value={data.releaseDate}
          name="releaseDate"
          onChange={handleChange}
        /><br /><br />
        
        <button type="submit" className="bg-violet-600 text-white font-medium text-lg px-4 py-2 rounded-md absolute right-0">
          Create movie
        </button>
      </form>
    </div>
  );
};

export default NewMovie;
