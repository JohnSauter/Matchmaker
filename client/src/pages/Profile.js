/* Profile.js */
/* Present the seeker's profile and let him modify it.  */

import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_PROFILE } from "../utils/mutations";

export function Profile() {
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: QUERY_USER }],
  });
  const { loading, data } = useQuery(QUERY_USER);
  const [profileForm, setProfileForm] = useState({
    gender: "",
    age: 100,
    height: 65,
    weight: 100,
    eyes: "brown",
    hair: "brown",
    aboutMe: "",
    contactInfo: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      setProfileForm(data.user);
    }
  }, [loading, data?.user]);

  const goHome = () => {
    navigate("/");
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateResponse = await updateProfile({
      variables: {
        gender: profileForm.gender,
        age: Number(profileForm.age),
        height: Number(profileForm.height),
        weight: Number(profileForm.weight),
        eyes: profileForm.eyes,
        hair: profileForm.hair,
        aboutMe: profileForm.aboutMe,
        contactInfo: profileForm.contactInfo,
      },
    });
    console.log(updateResponse);
    goHome();
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container my-1">
          <form className="choice_form" onSubmit={handleSubmit}>
            <h3>Tell us a little about yourself.</h3>
            <div className="flex-row flex-form-item my-1">
              <fieldset>
              <legend>
                What is your gender? </legend>
                <select
                  name="gender"
                  value={profileForm.gender}
                  onChange={handleInputChange}
                  autoFocus
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="nonbinary">Nonbinary</option>
                </select>
                </fieldset>
            </div>

            <div className="flex-row flex-form-item my-1">
            <fieldset>
              <legend>What is your age?</legend>
              <input
                name="age"
                type="text"
                size="3"
                value={profileForm.age}
                onChange={handleInputChange}
              />
              </fieldset>
            </div>

            <div className="flex-row flex-form-item my-1">
            <fieldset>
              <legend>What is your height in inches? </legend>
              <input
                name="height"
                type="text"
                size="3"
                value={profileForm.height}
                onChange={handleInputChange}
              />
              </fieldset>
            </div>

            <div className="flex-row flex-form-item my-1">
            <fieldset>
              <legend>What is your weight in pounds? </legend>
              <input
                name="weight"
                type="text"
                size="3"
                value={profileForm.weight}
                onChange={handleInputChange}
              />
              </fieldset>
            </div>

            <div className="flex-row flex-form-item my-1">
            <fieldset>
              <legend>What color are your eyes?</legend>
              <select
                name="eyes"
                value={profileForm.eyes}
                onChange={handleInputChange}
              >
                <option value="brown">Brown</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="gray">gray</option>
              </select>
              </fieldset>
            </div>

            <div className="flex-row flex-form-item my-1">
            <fieldset>
              <legend>
              What would you like your match to know about you?</legend>
              <textarea
                name="aboutMe"
                type="text"
                rows="7"
                cols="45"
                value={profileForm.aboutMe}
                onChange={handleInputChange}
              />
              </fieldset>
            </div>

            <div className="flex-row flex-form-item my-1">
            <fieldset>
              <legend>How would you like your match to contact you?</legend>
              <textarea
                name="contactInfo"
                type="text"
                rows="7"
                cols="45"
                value={profileForm.contactInfo}
                onChange={handleInputChange}
              />
              </fieldset>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
