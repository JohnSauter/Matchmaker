const db = require('./connection');
const { User, PotentialMatch } = require('../models');
const { aggregate } = require('../models/PotentialMatch');

db.once('open', async () => {


  await User.deleteMany();

  await User.create({
    username: 'Pamela Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    matchmaker: false,
    profile_specified: true,
    gender: 'Female',
    age: 32,
    height: 64,
    weight: 120,
    eyes: 'blue',
    hair: 'brown',
    aboutMe: 'Love anime,spicy food, Netflix and chill. Hate nature, being cold, shag carpet',
    contactinfo: "pamela@testmail.com",
    wishlist_specified: true,
    wishGen: 'male',
    minAge: 18,
    maxAge: 35,
    minHeight: 0,
    maxHeight: 100,
    minWeight: 0,
    maxWeight: 1000,
    wishEye: true,
    wishHair: true,
    paid: true,
    potentialMatches: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    username: 'Elijah Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    matchmaker: false,
    profile_specified: true,
    gender: 'Male',
    age: 29,
    height: 70,
    weight: 180,
    eyes: 'brown',
    hair: 'brown',
    aboutMe: 'soccer,Thai food, movies. Hate Project Runway,HGTV, winter',
    contactinfo: "eholt@testmail.com",
    wishlist_specified: true,
    wishGen: 'Female',
    minAge: 18,
    maxAge: 35,
    minHeight: 0,
    maxHeight: 100,
    minWeight: 0,
    maxWeight: 1000,
    wishEye: true,
    wishHair: true,
    paid: true,
    potentialMatches: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });
  await User.create({
    username: 'Sam Gamgee',
    email: 'sgamgee@lotr.com',
    password: 'Mellon',
    matchmaker: false,
    profile_specified: true,
    gender: 'Male',
    age: 39,
    height: 42,
    weight: 100,
    eyes: 'green',
    hair: 'blonde',
    aboutMe: 'I am a homebody who loves gardening and home-cooked meals. I do not like traveling. Looking for someone who likes pipes and second breakfast',
    contactinfo: "sgamgee@lotr.com",
    wishlist_specified: true,
    wishGen: 'Female',
    minAge: 33,
    maxAge: 100,
    minHeight: 0,
    maxHeight: 48,
    minWeight: 0,
    maxWeight: 1000,
    wishEye: true,
    wishHair: true,
    paid: true,
    potentialMatches: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });
  await User.create({
    username: 'Hari Seldon',
    email: 'hseldon@streeling.edu',
    password: 'the Raven',
    matchmaker: false,
    profile_specified: true,
    gender: 'Male',
    age: 42,
    height: 70,
    weight: 180,
    eyes: 'brown',
    hair: 'brown',
    aboutMe: 'I am a careful planner and not much for spontenaity. I am looking for someone who like peace and quiet but can take bad news with aplomb ',
    contactinfo: "hseldon@streeling.edu",
    wishlist_specified: true,
    wishGen: 'Female',
    minAge: 18,
    maxAge: 100,
    minHeight: 0,
    maxHeight: 100,
    minWeight: 0,
    maxWeight: 1000,
    wishEye: true,
    wishHair: true,
    paid: true,
    potentialMatches: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

console.log('users seeded');

process.exit();
});
