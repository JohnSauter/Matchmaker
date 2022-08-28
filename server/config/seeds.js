const db = require("./connection");
const { User, PotentialMatch } = require("../models");
const { aggregate } = require("../models/PotentialMatch");
const { isNullableType, UniqueFieldDefinitionNamesRule } = require("graphql");
const { match_recompute } = require("../utils/make_matches.js");

db.once("open", async () => {
  await User.deleteMany();
  await PotentialMatch.deleteMany();

  await User.create({
    username: "Rosie Cotton",
    email: "rosie@systemeyescomputerstore.com",
    password: "GreenDragon",
    matchmaker: false,
    profile_specified: true,
    gender: "female",
    age: 35,
    height: 38,
    weight: 90,
    eyes: "green",
    hair: "blonde",
    aboutMe:
      "I am sociable, patient, and love to dance. I am looking for someone who wants to make a home.",
    contactInfo: "rosie@systemeyescomputerstore.com",
    wishlist_specified: true,
    wishgen_male: true,
    wishgen_female: false,
    wishgen_nonbinary: false,
    minage: 33,
    maxage: 100,
    minheight: 0,
    maxheight: 48,
    minweight: 0,
    maxweight: 1000,
    wisheye_brown: true,
    wisheye_blue: true,
    wisheye_gray: false,
    wisheye_green: true,
    wisheye_hazel: true,
    wishhair_black: true,
    wishhair_brown: true,
    wishhair_blond: true,
    wishhair_red: false,
    paid: true,
    match_found: false,
    found_match: null,
  });

  await User.create({
    username: "Julius Caesar",
    email: "jcaesar@systemeyescomputerstore.com",
    password: "IdesofMarch",
    matchmaker: false,
    profile_specified: true,
    gender: "male",
    age: 50,
    height: 68,
    weight: 170,
    eyes: "brown",
    hair: "brown",
    aboutMe:
      "My likes include Italian food, subjugating peoples, and receiving adoring crowds. Love to travel. Looking for someone who wants to be treated like a queen",
    contactInfo: "jcaesar@systemeyescomputerstore.com",
    wishlist_specified: true,
    wishgen_male: true,
    wishgen_female: true,
    wishgen_nonbinary: true,
    minage: 18,
    maxage: 35,
    minheight: 0,
    maxheight: 100,
    minweight: 0,
    maxweight: 1000,
    wisheye_brown: true,
    wisheye_blue: true,
    wisheye_gray: false,
    wisheye_green: true,
    wisheye_hazel: true,
    wishhair_black: true,
    wishhair_brown: true,
    wishhair_blond: false,
    wishhair_red: true,
    paid: true,
    match_found: false,
    found_match: null,
  });

  await User.create({
    username: "Sam Gamgee",
    email: "sgamgee@systemeyescomputerstore.com",
    password: "Mellon",
    matchmaker: false,
    profile_specified: true,
    gender: "male",
    age: 39,
    height: 42,
    weight: 100,
    eyes: "green",
    hair: "blonde",
    aboutMe:
      "I am a homebody who loves gardening and home-cooked meals. I do not like traveling. Looking for someone who likes pipes and second breakfast",
    contactInfo: "sgamgee@systemeyescomputerstore.com",
    wishlist_specified: true,
    wishgen_male: false,
    wishgen_female: true,
    wishgen_nonbinary: false,
    minage: 33,
    maxage: 100,
    minheight: 0,
    maxheight: 48,
    minweight: 0,
    maxweight: 1000,
    wisheye_brown: false,
    wisheye_blue: true,
    wisheye_gray: false,
    wisheye_green: true,
    wisheye_hazel: true,
    wishhair_black: true,
    wishhair_brown: true,
    wishhair_blond: true,
    wishhair_red: false,
    paid: true,
    match_found: false,
    found_match: null,
  });

  await User.create({
    username: "Hari Seldon",
    email: "hseldon@systemeyescomputerstore.com",
    password: "the Raven",
    matchmaker: false,
    profile_specified: true,
    gender: "male",
    age: 42,
    height: 70,
    weight: 180,
    eyes: "brown",
    hair: "brown",
    aboutMe:
      "I am a careful planner and not much for spontenaity. I am looking for someone who like peace and quiet but can take bad news with aplomb. Open to sentient AI. ",
    contactInfo: "hseldon@systemeyescomputerstore.com",
    wishlist_specified: true,
    wishgen_male: false,
    wishgen_female: true,
    wishgen_nonbinary: true,
    minage: 18,
    maxage: 100,
    minheight: 0,
    maxheight: 100,
    minweight: 0,
    maxweight: 1000,
    wisheye_brown: true,
    wisheye_blue: true,
    wisheye_gray: true,
    wisheye_green: true,
    wisheye_hazel: true,
    wishhair_black: true,
    wishhair_brown: true,
    wishhair_blond: true,
    wishhair_red: true,
    paid: true,
    match_found: false,
    found_match: null,
  });

  await User.create({
    username: "Cleopatra Philopator",
    email: "cphilopato@systemeyescomputerstore.com",
    password: "emerald",
    matchmaker: false,
    profile_specified: true,
    gender: "female",
    age: 27,
    height: 65,
    weight: 90,

    eyes: 'blue',
    hair: 'red',
    aboutMe: 'I am used to getting my way. I am looking for someone who will treat me like the goddess that I am.',
    contactInfo: "'cphilopato@systemeyescomputerstore.com'",

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
    wisheye_gray: false,
    wisheye_green: true,
    wisheye_hazel: true,
    wishhair_black: true,
    wishhair_brown: true,
    wishhair_blond: true,
    wishhair_red: false,
    paid: true,
    match_found: false,
    found_match: null,
  });

  await User.create({
    username: "Mark Antony",
    email: "mantony@systemeyescomputerstore.gov",
    password: "IamdyingEgyptdying.",
    matchmaker: false,
    profile_specified: true,
    gender: "male",
    age: 39,
    height: 68,
    weight: 170,
    eyes: "brown",
    hair: "brown",
    aboutMe: "I am a member of the College of Augurs",
    contactInfo: "mantony@systemeyescomputerstore.com",
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
    wisheye_gray: false,
    wisheye_green: false,
    wishhair_black: true,
    wishhair_brown: false,
    wishhair_blond: false,
    wishhair_red: true,
    paid: true,
    match_found: false,
    found_match: null,
  });

  await User.create({
    username: "Seven of Nine",
    email: "easternexposuredev@gmail.com",
    password: "AnnikaHansen",
    matchmaker: false,
    profile_specified: true,
    gender: "female",
    age: 27,
    height: 68,
    weight: 120,
    eyes: "blue",
    hair: "blonde",
    aboutMe:
      "My likes include optimizing computer systems and Stellar Cartography. Love to travel. Looking for someone who is very human and plays Kadis-kot",
    contactInfo: "sofnine@voyager.net",
    wishlist_specified: true,
    wishgen_male: true,
    wishgen_female: true,
    wishgen_nonbinary: true,
    minage: 18,
    maxage: 1000,
    minheight: 0,
    maxheight: 100,
    minweight: 0,
    maxweight: 1000,
    wisheye_brown: true,
    wisheye_blue: true,
    wisheye_gray: true,
    wisheye_green: true,
    wisheye_hazel: true,
    wishhair_black: true,
    wishhair_brown: true,
    wishhair_blond: true,
    wishhair_red: true,
    paid: true,
    match_found: false,
    found_match: null,
  });
  
  await User.create({
    username: "Worf Martok",
    email: "easternexposuredev@systemeyescomputerstore.com",
    password: "the Raven",
    matchmaker: false,
    profile_specified: true,
    gender: "male",
    age: 28,
    height: 75,
    weight: 200,
    eyes: "brown",
    hair: "brown",
    aboutMe:
      "I am a warrior and live for honor. I enjoy practicing Mok’bara and  bat’leth. I am looking for someone with a sense of honor and who is not fragile,  but is only mediocre at poker ",
    contactInfo: "wmartok@enterprise.gov",
    wishlist_specified: true,
    wishgen_male: false,
    wishgen_female: true,
    wishgen_nonbinary: false,
    minage: 18,
    maxage: 100,
    minheight: 0,
    maxheight: 100,
    minweight: 0,
    maxweight: 1000,
    wisheye_brown: true,
    wisheye_blue: true,
    wisheye_gray: true,
    wisheye_green: true,
    wisheye_hazel: true,
    wishhair_black: true,
    wishhair_brown: true,
    wishhair_blond: true,
    wishhair_red: true,
    paid: true,
    match_found: false,
    found_match: null,
  });

  await User.create({
    username: "Yenta",
    email: "Yenta@fiddlerontheroof.com",
    password: "12345678",
    matchmaker: true,
    profile_specified: false,
    wishlist_specified: false,
    paid: false,
    match_found: false,
  });

  console.log("users seeded");

  const matches_created = await match_recompute([]);
  console.log(String(matches_created) + " potential matches found.");

  process.exit(1);
});
