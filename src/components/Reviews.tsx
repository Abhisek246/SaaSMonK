import { SquarePen } from 'lucide-react';
import { Trash } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Reviews = () => {
  const { id } = useContext(StoreContext);
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState('');
  const [avgRating, setAvgRating] = useState(0);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/reviews/${id}`);
      if (response.data.success) {
        setReviews(response.data.reviews);
        setMovie(response.data.movie.name);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, item) => acc + Number(item.rating), 0);
      const average = sum / reviews.length;
      setAvgRating(average.toFixed(2)); 
    }
  }, [reviews]);

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  const handleDelete = async (id)=>{
    const response = await axios.delete(`http://localhost:3000/review/${id}`)
    if(response.data.success) {
      setReviews(prevReviews => prevReviews.filter(review => review._id !== id));
      console.log(response.data.message);
    }
  }

  return (
    <div className="px-16">
      <div className="flex justify-between">
        <h1 className="text-4xl my-6 font-semibold">{movie}</h1>
        {avgRating > 0 && <span className="text-4xl my-6 text-violet-600 font-medium">{avgRating}/10</span>}       
      </div>
      <div className="mt-4">
        {reviews.length > 0 ? (
          reviews.map((item, index) => (
            <div className="border border-gray-300 shadow-md p-6 mb-8" key={index}>
              <div className="flex justify-between ml-4 text-xl font-medium">
                <p>{item.comment}</p>
                <p className="text-violet-600">{item.rating}/10</p>
              </div>
              <div className="flex justify-between ml-4 mt-8 items-center">
                <p className="italic font-medium text-xl">By {item.reviewerName}</p>
                <div className="flex gap-4">
                  <span className="text-gray-600">
                    <SquarePen />
                  </span>
                  <span
                    className="text-gray-600 cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash />
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
