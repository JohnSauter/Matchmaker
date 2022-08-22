/* make_matches.js */
/* Create potential matches for each pair of seekers.  */
const { User, PotentialMatch } = require("../models");

/* Function of two seekers to see if the first fits the
 * wishes of the second.  */
function compatible(user_a, user_b) {
  if ((user_a.gender == "male") && (!user_b.wishgen_male)) { return false };
  if ((user_a.gender == "female") && (!user_b.wishgen_female)) { return false };
  if ((user_a.gender == "nonbinary") && (!user_b.wishgen_nonbinary)) { return false };
  if (user_a.age < user_b.minage) { return false };
  if (user_a.age > user_b.maxage) { return false };
  if (user_a.height < user_b.minheight) { return false };
  if (user_a.height > user_b.maxheight) { return false };
  if (user_a.weight < user_b.minweight) { return false };
  if (user_a.weight > user_b.maxweight) { return false };
  if ((user_a.eyes == "brown") && (!user_b.wisheye_brown)) { return false };
  if ((user_a.eyes == "blue") && (!user_b.wisheye_blue)) { return false };
  if ((user_a.eyes == "gray") && (!user_b.wisheye_gray)) { return false };
  if ((user_a.eyes == "green") && (!user_b.wisheye_green)) { return false };
  if ((user_a.eyes == "hazel") && (!user_b.wisheye_hazel)) { return false };
  if ((user_a.hair == "black") && (!user_b.wishhair_black)) { return false };
  if ((user_a.hair == "brown") && (!user_b.wishhair_brown)) { return false };
  if ((user_a.hair == "blond") && (!user_b.wishhair_blond)) { return false };
  if ((user_a.hair == "red") && (!user_b.wishhair_red)) { return false };

  /* All tests pass.  */
  return true;
}

/* The specified user or users has done something which 
 * invalidates any
 * matches he might previously have had.  Delete them and
 * check to see if he has any new potential matches
 * for the matchmaker to rate.  */
module.exports = {
  match_recompute: async function (user_ids) {

    /* Delete any existing matches for these users.  */
    const promises = [];
    user_ids.forEach((user_id) => {
      const the_promise = PotentialMatch.deleteMany({
        $or: [
          { User1: { user_id } },
          { User2: { user_id } }
        ]
      });
      promises.push(the_promise);
    });
    await Promise.all(promises);

    /* Get the list of seekers who are eligible for matches.  */
    const users = await User.find({
      matchmaker: false,
      profile_specified: true,
      wishlist_specified: true,
      paid: true,
      match_found: false
    });

    /* Check each pair of seekers to see if they match.  */
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const user_1 = users[i];
        const user_2 = users[j];
        if ((compatible(user_1, user_2) && compatible(user_2, user_1))) {
          /* We have a mutual potential match.  See if it is already recorded.  */
          const existing_matches = await PotentialMatch.find({
            $or: [
              { User1: user_1._id, User2: user_2._id },
              { User1: user_2._id, User2: user_1._id }
            ]
          });

          /* If there is no prior record of such a match, create one.  */
          if (existing_matches.length == 0) {
            await PotentialMatch.create({
              User1: user_1._id, User2: user_2._id,
              rated: false, rating: 0
            });
          }
        }
      }
    }
  }
};

