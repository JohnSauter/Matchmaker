/* Wishlist.js */
/* Present the seeker's wish list so he can update it.  */
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_WISHLIST } from "../utils/mutations";
import {} from "../utils/actions";

export function Wishlist() {
  const [updateWishList] = useMutation(UPDATE_WISHLIST, {
    refetchQueries: [{ query: QUERY_USER }],
  });
  const { loading, data } = useQuery(QUERY_USER);
  const [wishlistForm, setWishlistForm] = useState({
    wishgen_male: true,
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
  });

  useEffect(() => {
    if (!loading) {
      setWishlistForm(data.user);
    }
  }, [loading, data?.user]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setWishlistForm({
      ...wishlistForm,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateResponse = await updateWishList({
      variables: {
        wishgen_male: wishlistForm.wishgen_male,
        wishgen_female: wishlistForm.wishgen_female,
        wishgen_nonbinary: wishlistForm.wishgen_nonbinary,
        minage: wishlistForm.minage,
        maxage: wishlistForm.maxage,
        minheight: wishlistForm.minheight,
        maxheight: wishlistForm.maxheight,
        minweight: wishlistForm.minweight,
        maxweight: wishlistForm.maxweight,
        wisheye_brown: wishlistForm.wisheye_brown,
        wisheye_blue: wishlistForm.wisheye_blue,
        wisheye_gray: wishlistForm.wisheye_gray,
        wisheye_green: wishlistForm.wisheye_green,
        wisheye_hazel: wishlistForm.wisheye_hazel,
        wishhair_black: wishlistForm.wishhair_black,
        wishhair_brown: wishlistForm.wishhair_brown,
        wishhair_blond: wishlistForm.wishhair_blond,
        wishhair_red: wishlistForm.wishhair_red,
        wishlist_specified: true,
      },
    });
    console.log(updateResponse);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Tell us about what you are seeking in your match.</h2>
          <form className="choice_form" onSubmit={handleSubmit}>
            <div className="flex-row flex-form-item my-1">
              <fieldset>
                <legend>
                  Please uncheck any genders that are not acceptable.
                </legend>
                <label>
                  Male
                  <input
                    name="wishgen_male"
                    type="checkbox"
                    checked={wishlistForm.wishgen_male}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Female
                  <input
                    name="wishgen_female"
                    type="checkbox"
                    checked={wishlistForm.wishgen_female}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Nonbinary
                  <input
                    name="wishgen_nonbinary"
                    type="checkbox"
                    checked={wishlistForm.wishgen_nonbinary}
                    onChange={handleInputChange}
                  />
                </label>
              </fieldset>
            </div>

            <div className="flex-row flex-form-item my-1">
              <label>
                What is the minimum age you would prefer in your match? You may
                choose an age from 18-100.
              </label>
              <input
                name="minage"
                type="number"
                value={wishlistForm.minage}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-row flex-form-item my-1">
              <label>
                What is the maximum age you would prefer in your match? You may
                choose an age from 18-100.
                <input
                  name="maxage"
                  type="number"
                  value={wishlistForm.maxage}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="flex-row flex-form-item my-1">
              <label>
                What is the minimum height you would prefer in your match? You
                may choose a height of 0-100 inches.
                <input
                  name="minheight"
                  type="number"
                  value={wishlistForm.minheight}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="flex-row flex-form-item my-1">
              <label>
                What is the maximum height you would prefer in your match? You
                may choose a height of 0-100 inches.
                <input
                  name="maxheight"
                  type="number"
                  value={wishlistForm.maxheight}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="flex-row flex-form-item my-1">
              <label>
                What is the minimum weight you would prefer in your match? You
                may choose a weight of 0-1000 pounds.
                <input
                  name="minweight"
                  type="number"
                  value={wishlistForm.minweight}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="flex-row flex-form-item my-1">
              <label>
                What is the maximum weight you would prefer in your match? You
                may choose a weight of 0-100 inches.
                <input
                  name="maxweight"
                  type="number"
                  value={wishlistForm.maxweight}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="flex-row flex-form-item my-1">
              <fieldset>
                <legend>
                  Please uncheck any eye color that is not acceptable.
                </legend>
                <label>
                  Brown
                  <input
                    name="wisheye_brown"
                    type="checkbox"
                    checked={wishlistForm.wisheye_brown}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Blue
                  <input
                    name="wisheye_blue"
                    type="checkbox"
                    checked={wishlistForm.wisheye_blue}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Gray
                  <input
                    name="wisheye_gray"
                    type="checkbox"
                    checked={wishlistForm.wisheye_gray}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Green
                  <input
                    name="wisheye_green"
                    type="checkbox"
                    checked={wishlistForm.wisheye_green}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Hazel
                  <input
                    name="wisheye_hazel"
                    type="checkbox"
                    checked={wishlistForm.wisheye_hazel}
                    onChange={handleInputChange}
                  />
                </label>
              </fieldset>
            </div>

            <div className="flex-row flex-form-item my-1">
              <fieldset>
                <legend>
                  Please uncheck any hair color that is not acceptable.
                </legend>
                <label>
                  Black
                  <input
                    name="wishhair_black"
                    type="checkbox"
                    checked={wishlistForm.wishhair_black}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Brown
                  <input
                    name="wishhair_brown"
                    type="checkbox"
                    checked={wishlistForm.wishhair_brown}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Blond
                  <input
                    name="wishhair_blond"
                    type="checkbox"
                    checked={wishlistForm.wishhair_blond}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Red
                  <input
                    name="wishhair_red"
                    type="checkbox"
                    checked={wishlistForm.wishhair_red}
                    onChange={handleInputChange}
                  />
                </label>
              </fieldset>
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
}
