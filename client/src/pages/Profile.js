/* Profile.js */
/* Present the seeker's profile and let him modify it.  */

import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import {} from "../utils/queries";
import {} from "../utils/actions";
import {} from "../utils/queries";
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
  useEffect(() => {
    if (!loading) {
      setProfileForm(data.user);
    }
  }, [loading, data?.user]);

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
        age: profileForm.age,
        height: profileForm.height,
        weight: profileForm.weight,
        eyes: profileForm.eyes,
        hair: profileForm.hair,
        aboutMe: profileForm.aboutMe,
        contactInfo: profileForm.contactInfo,
      },
    });
    console.log(updateResponse);
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
              <label>
                What is your gender? </label>
                <select
                  name="gender"
                  value={profileForm.gender}
                  onChange={handleInputChange}
                  autofocus
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="nonbinary">Nonbinary</option>
                </select>
            </div>

            <div className="flex-row flex-form-item my-1">
            <label>
              What is your age?</label>
              <input
                name="age"
                type="number"
                value={profileForm.age}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex-row flex-form-item my-1">
            <label>
              What is your height? </label>
              <input
                name="height"
                type="number"
                value={profileForm.height}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex-row flex-form-item my-1">
            <label>
              What is your weight? </label>
              <input
                name="weight"
                type="number"
                value={profileForm.weight}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex-row flex-form-item my-1">
            <label>
              What color are your eyes?</label>
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
            </div>

            <div className="flex-row flex-form-item my-1">
            <label>
              What would you like your match to know about you?</label>
              <textarea
                name="aboutMe"
                type="text"
                rows="7"
                cols="50"
                value={profileForm.aboutMe}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex-row flex-form-item my-1">
            <label>
              How would you like your match to contact you?</label>
              <textarea
                name="contactInfo"
                type="text"
                rows="7"
                cols="50"
                value={profileForm.contactInfo}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
