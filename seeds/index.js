const mongoose = require('mongoose');
const axios = require('axios');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

const mongoURI = 'mongodb://localhost:27017/yelp-camp';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// call unsplash and return small image
async function seedImg() {
  try {
    const resp = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: 'WZLErMFID02S5CiXi_UD6ucJ-F95DInUUwacS_o1zRI',
        collections: 1114848,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
}
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 20; i++) {
    //setup
    const placeSeed = Math.floor(Math.random() * places.length);
    const descriptorsSeed = Math.floor(Math.random() * descriptors.length);
    const citySeed = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 20) + 10;

    //seed data into campground
    const camp = new Campground({
      author: '64c7c8193444c3f4c42ca5b1',
      imageUrl: [
        {
          url: 'https://res.cloudinary.com/dk7kmqjmp/image/upload/v1690986732/YelpCamp/qdemneu004occt9x4abn.jpg',
          filename: 'YelpCamp/qdemneu004occt9x4abn',
        },
        {
          url: 'https://res.cloudinary.com/dk7kmqjmp/image/upload/v1691024464/YelpCamp/qwrbimjxzmdrnwikfo27.jpg',
          filename: 'YelpCamp/qwrbimjxzmdrnwikfo27',
        },
      ],
      title: `${descriptors[descriptorsSeed]} ${places[placeSeed]}`,
      location: `${cities[citySeed].city}, ${cities[citySeed].state}`,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo',
      price,
    });
    await camp.save();
  }
};

seedDB();

// imageUrl before : await seedImg(),
