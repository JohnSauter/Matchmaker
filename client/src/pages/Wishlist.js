/* Wishlist.js */
/* Present the seeker's wish list so he can update it.  */
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_WISHLIST } from "../utils/mutations";
import { } from "../utils/actions";


export function Wishlist() {
  const [updateWishlist] = useMutation(UPDATE_WISHLIST, {
    refetchQueries: [{ query: QUERY_USER }],
  });
  const { loading, data } = useQuery(QUERY_USER);
  const [wishlistForm, setWishListForm] = useState({
    wishgen_male: false,
    wishgen_female: false,
    wishgen_nonbinary: false,
    minage: 18,
    maxage: 100,
    minheight: 0,
    maxheight: 100,
    minweight: 0,
    maxweight: 1000,
    wisheye_brown: false,
    wisheye_blue: false,
    wisheye_gray: false,
    wisheye_green: false,
    wisheye_hazel: false,
    wishhair_black: false,
    wishhair_brown: false,
    wishhair_blond: false,
    wishhair_red: false,
  });

  useEffect(() => {
    if (!loading) {
      setWishListForm(data.user);
    }
  }, [loading, data?.user]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setWishListForm({
      ...wishlistForm,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateResponse = await updateProfile({
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
      },
    });
    console.log(updateResponse);
  };

  return (
    <div>
      <p>Wishlist</p>
    </div >
  );
}
