import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewReview = () => {
  const [data, setData] = useState({
    movie: '',
    reviewerName: '',
    rating: '',
    comment: '',
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

    const response = await axios.post('http://localhost:3000/review', data);

    if(response.data.success){
      console.log(response.data.message);
      nav('/')
    }else{
      console.log(response.data.message);
    }
  }


  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-semibold ">Add new review</h1>
      <form onSubmit={handleSubmit} className="mt-10 relative">
        <input type="text" placeholder="Movie name" value={data.movie} name="movie" className="border px-4 py-2 w-96 outline-gray-400" onChange={handleChange}/><br/><br/>
        <input type="text" placeholder="Your name" value={data.reviewerName} name="reviewerName" className="border px-4 py-2 w-96 outline-gray-400" onChange={handleChange}/><br/><br/>
        <input type="text" placeholder="Rating out of 10" value={data.rating} name="rating" className="border px-4 py-2 w-96 outline-gray-400" onChange={handleChange}/><br/><br/>
        <textarea rows={6} placeholder="Review comments" value={data.comment} name="comment" className="border px-4 py-2 w-96 outline-gray-400" onChange={handleChange}/><br/><br/>
        <button type="submit" className="bg-violet-600 text-white font-medium text-lg px-4 py-2 rounded-md absolute right-0">Add review</button>
      </form>
    </div>
  )
}

export default NewReview