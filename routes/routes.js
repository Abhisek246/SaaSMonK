const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel.js')
const Review = require('../models/reviewModel.js')

router.get('/', async (req,res)=>{
    try {
        const movies = await Movie.find({});
        res.json({success: true, movies})
    } catch (error) {
        res.json({success:false, message: "ERROR"})
        console.log(error);
    }
})

router.post('/movie', async (req,res)=>{
    try{
        const {name, releaseDate} = req.body;
        const newMovie = new Movie({name, releaseDate});
        await newMovie.save();
        res.json({success: true, message: 'Movie added successfully'})
    } catch(error){
        res.json({success:false, message: "ERROR"})
        console.log(error);
    }
})

router.delete('/movie/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        await Movie.findByIdAndDelete(id);
        const reviews = await Review.find({movieId: id});
        console.log(reviews);
        if(reviews.length > 0){
            await Review.deleteMany({movieId: id});
        }
        res.json({success:true, message: 'Movie deleted successfully'});
    } catch (error) {
        res.json({success:false, message: "ERROR"});
        console.log(error)
    }
})


//reviews route

router.get('/reviews/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const reviews = await Review.find({movieId: id});
        const movie = await Movie.findById(id);
        res.json({success: true, reviews, movie})
    } catch (error) {
        res.json({success:false, message: "ERROR"})
        console.log(error);
    }
})

router.post('/review', async (req,res)=>{
    try {
        const {movie, reviewerName, rating, comment} = req.body;
        const findMovie = await Movie.findOne({ name: movie });
        console.log(findMovie)

        if (!findMovie) {
            return res.json({ success: false, message: "Movie not found" });
        }
        const newReview = new Review({
            movieId: findMovie._id, // Link the review to the movie by its ID
            reviewerName,
            rating,
            comment
        });
        await newReview.save();

        const reviews = await Review.find({movieId: findMovie._id});
        const sum = reviews.reduce((acc, item) => acc + Number(item.rating), 0);
        const average = sum / reviews.length;
        await Movie.findByIdAndUpdate(findMovie._id, {averageRating: average});

        res.json({ success: true, message: "Review added successfully", review: newReview });
    } catch (error) {
        res.json({success:false, message: "ERROR"});
        console.log(error)
    }
})

router.delete('/review/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        await Review.findByIdAndDelete(id);
        res.json({success:true, message: 'Review deleted successfully'});
    } catch (error) {
        res.json({success:false, message: "ERROR"});
        console.log(error)
    }
})


module.exports = router;