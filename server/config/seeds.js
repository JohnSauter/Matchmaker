const db = require('./connection');
const { User, PotentialMatch } = require('../models');
const { aggregate } = require('../models/PotentialMatch');

db.once('open', async () => {


  await User.deleteMany();

  await User.create({
    username: 'Rosie Cotton',
    email: 'rosie@theshire.net',
    password: 'GreenDragon',
    matchmaker: false,
    profile_specified: true,
    gender: 'Female',
    age: 35,
    height: 38,
    weight: 90,
    eyes: 'green',
    hair: 'blonde',
    aboutMe: 'I am sociable, patient, and love to dance. I am looking for someone who wants to make a home.',
    contactinfo: "rosie@theshire.net",
    wishlist_specified: true,
    wishgen_male: true,
    wishgen_female: false,
    wishgen_nonbinary: false,
    minAge: 33,
    maxAge: 100,
    minHeight: 0,
    maxHeight: 48,
    minWeight: 0,
    maxWeight: 1000,
    wisheye_brown: true,
    wisheye_blue: true,
    whisheye_gray: false,
    wisheye_green: true,
        wishhair_black: true,
    wishhair_brown: false,
    wishhair_blond: true,
    wishhair_red: false,
    paid: true,
    match_found: false,
    found_match:false
  });

  await User.create({
    username: 'Julius Caesar',
    email: 'jcaesar@empire.com',
    password: 'IdesofMarch',
    matchmaker: false,
    profile_specified: true,
    gender: 'Male',
    age: 50,
    height: 68,
    weight: 170,
    eyes: 'brown',
    hair: 'brown',
    aboutMe: 'My likes include Italian food, subjugating peoples, and receiving adoring crowds. Love to travel. Looking for someone who wants to be treated like a queen',
    contactinfo: "jcaesar@empire.com",
    wishlist_specified: true,
    wishgen_male: true,
    wishgen_female: true,
    wishgen_nonbinary: true,
    minAge: 18,
    maxAge: 35,
    minHeight: 0,
    maxHeight: 100,
    minWeight: 0,
    maxWeight: 1000,
    wisheye_brown: true,
    wisheye_blue: true,
    whisheye_gray: false,
    wisheye_green: false,
    wishhair_black: true,
    wishhair_brown: false,
    wishhair_blond: false,
    wishhair_red: true,
    paid: true,
    match_found: false,
    found_match:false
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
    wishgen_male: false,
    wishgen_female: true,
    wishgen_nonbinary: false,
    minAge: 33,
    maxAge: 100,
    minHeight: 0,
    maxHeight: 48,
    minWeight: 0,
    maxWeight: 1000,
    wisheye_brown: false,
    wisheye_blue: true,
    whisheye_gray: false,
    wisheye_green: true,
    wishhair_black: true,
    wishhair_brown: false,
    wishhair_blond: true,
    wishhair_red: false,
    paid: true,
    match_found: false,
    found_match:false
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
    aboutMe: 'I am a careful planner and not much for spontenaity. I am looking for someone who like peace and quiet but can take bad news with aplomb. Open to sentient AI. ',
    contactinfo: "hseldon@streeling.edu",
    wishlist_specified: true,
    wishgen_male: false,
    wishgen_female: true,
    wishgen_nonbinary: true,
    minAge: 18,
    maxAge: 100,
    minHeight: 0,
    maxHeight: 100,
    minWeight: 0,
    maxWeight: 1000,
    wisheye_brown: true,
    wisheye_blue: true,
    whisheye_gray: true,
    wisheye_green: true,
    wisheye_hazel: true,
    wishhair_black: true,
    wishhair_brown: true,
    wishhair_blond: true,
    wishhair_red: true,
    paid: true,
    match_found: false,
    found_match:false
  });
  await User.create({
  username: 'Cleopatra Philopator',
    email: 'cphilopato@ptolemy.gov',
    password: 'emerald',
    matchmaker: false,
    profile_specified: true,
    gender: 'Female',
    age: 27,
    height: 65,
    weight: 90,
    eyes: 'blue',
    hair: 'red',
    aboutMe: 'I am sociable, patient, and love to dance. I am looking for someone who wants to make a home.',
    contactinfo: "'cphilopato@ptolemy.gov'",
    wishlist_specified: true,
    wishgen_male: true,
    wishgen_female: false,
    wishgen_nonbinary: false,
    minAge: 30,
    maxAge: 100,
    minHeight: 0,
    maxHeight: 100,
    minWeight: 0,
    maxWeight: 1000,
    wisheye_brown: true,
    wisheye_blue: true,
    whisheye_gray: false,
    wisheye_green: true,
        wishhair_black: true,
    wishhair_brown: true,
    wishhair_blond: true,
    wishhair_red: false,
    paid: true,
    match_found: false,
    found_match:false
  });
  await User.create({
    username: 'Mark Antony',
    email: 'mantony@secondtriumvirate.gov',
    password: 'IamdyingEgyptdying.',
    matchmaker: false,
    profile_specified: true,
    gender: 'Male',
    age: 39,
    height: 68,
    weight: 170,
    eyes: 'brown',
    hair: 'brown',
    aboutMe: '',
    contactinfo: "mantony@secondtriumvirate.gov",
    wishlist_specified: true,
    wishgen_male: true,
    wishgen_female: true,
    wishgen_nonbinary: true,
    minAge: 18,
    maxAge: 35,
    minHeight: 0,
    maxHeight: 100,
    minWeight: 0,
    maxWeight: 1000,
    wisheye_brown: true,
    wisheye_blue: true,
    whisheye_gray: false,
    wisheye_green: false,
    wishhair_black: true,
    wishhair_brown: false,
    wishhair_blond: false,
    wishhair_red: true,
    paid: true,
    match_found: false,
    found_match:false
  });
console.log('users seeded');

process.exit();
});
