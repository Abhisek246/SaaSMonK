const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    reviewerName: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        min: 0,
        max: 10,
        required: true
    },
    comment: {
        type: String,
        default: ''
    }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;