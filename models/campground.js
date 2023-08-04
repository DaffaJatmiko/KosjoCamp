const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200,h_250');
});

imageSchema.virtual('normalSize').get(function () {
  return this.url.replace('/upload', '/upload/w_400,h_450');
});

const CampgroundSchema = new Schema({
  title: String,
  imageUrl: [imageSchema],
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model('Campground', CampgroundSchema);
