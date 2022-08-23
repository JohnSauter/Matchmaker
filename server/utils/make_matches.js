/* make_matches.js */
/* Create potential matches for each pair of seekers.  */
const { User, PotentialMatch } = require("../models");

const logging = false;

/* Function of two seekers to see if the first fits the
 * wishes of the second.  */
function compatible(user_a, user_b) {
  if (logging) {
    console.log("checking " + user_a.username + " with " + user_b.username);
  }

  if (user_a.gender == "male" && !user_b.wishgen_male) {
    if (logging) {
      console.log("gender male");
    }
    return false;
  }
  if (user_a.gender == "female" && !user_b.wishgen_female) {
    if (logging) {
      console.log("gender female");
    }
    return false;
  }
  if (user_a.gender == "nonbinary" && !user_b.wishgen_nonbinary) {
    if (logging) {
      console.log("gender nonbinary");
    }
    return false;
  }
  if (user_a.age < user_b.minage) {
    if (logging) {
      console.log("minimum age");
    }
    return false;
  }
  if (user_a.age > user_b.maxage) {
    if (logging) {
      console.log("maximum age");
    }
    return false;
  }
  if (user_a.height < user_b.minheight) {
    if (logging) {
      console.log("minimum height");
    }
    return false;
  }
  if (user_a.height > user_b.maxheight) {
    if (logging) {
      console.log("maximum height");
    }
    return false;
  }
  if (user_a.weight < user_b.minweight) {
    if (logging) {
      console.log("minimum weight");
    }
    return false;
  }
  if (user_a.weight > user_b.maxweight) {
    if (logging) {
      console.log("maximum weight");
    }
    return false;
  }
  if (user_a.eyes == "brown" && !user_b.wisheye_brown) {
    if (logging) {
      console.log("eyes brown");
    }
    return false;
  }
  if (user_a.eyes == "blue" && !user_b.wisheye_blue) {
    if (logging) {
      console.log("eyes blue");
    }
    return false;
  }
  if (user_a.eyes == "gray" && !user_b.wisheye_gray) {
    if (logging) {
      console.log("eyes gray");
    }
    return false;
  }
  if (user_a.eyes == "green" && !user_b.wisheye_green) {
    if (logging) {
      console.log("eyes green");
    }
    return false;
  }
  if (user_a.eyes == "hazel" && !user_b.wisheye_hazel) {
    if (logging) {
      console.log("eyes hazel");
    }
    return false;
  }
  if (user_a.hair == "black" && !user_b.wishhair_black) {
    if (logging) {
      console.log("hair black");
    }
    return false;
  }
  if (user_a.hair == "brown" && !user_b.wishhair_brown) {
    if (logging) {
      console.log("hair brown");
    }
    return false;
  }
  if (user_a.hair == "blond" && !user_b.wishhair_blond) {
    if (logging) {
      console.log("hair blond");
    }
    return false;
  }
  if (user_a.hair == "red" && !user_b.wishhair_red) {
    if (logging) {
      console.log("hair red");
    }
    return false;
  }

  /* All tests pass.  */
  if (logging) {
    console.log("match");
  }
  return true;
}

/* The specified user or users has done something which
 * invalidates any matches he might previously have had.
 * Delete them and check to see if he has any new p
 * otential matches for the matchmaker to rate.
 * Return the number of new matches created.  */
module.exports = {
  match_recompute: async function (user_ids) {
    /* Delete any existing matches for these users.  */
    const promises = [];
    user_ids.forEach((user_id) => {
      const the_promise = PotentialMatch.deleteMany({
        $or: [{ User1: { user_id } }, { User2: { user_id } }],
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
      match_found: false,
    });

    /* Check each pair of seekers to see if they match.  */
    let matches_created = 0;
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const user_1 = users[i];
        const user_2 = users[j];
        if (compatible(user_1, user_2) && compatible(user_2, user_1)) {
          /* We have a mutual potential match.  See if it is already recorded.  */
          const existing_matches = await PotentialMatch.find({
            $or: [
              { User1: user_1._id, User2: user_2._id },
              { User1: user_2._id, User2: user_1._id },
            ],
          });

          /* If there is no prior record of such a match, create one.  */
          if (existing_matches.length == 0) {
            await PotentialMatch.create({
              User1: user_1._id,
              User2: user_2._id,
              rated: false,
              rating: 0,
            });
            matches_created = matches_created + 1;
          }
        }
      }
    }

    return matches_created;
  },
};
