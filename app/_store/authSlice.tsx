import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    login: (state, { payload }) => {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          _id: payload._id,
          token: payload.token,
        })
      );
      return payload;
    },

    logout: () => {
      localStorage.removeItem("userInfo");
      return null;
    },

    updateProfile: (state: any, { payload }) => {
      const newState = {
        ...state,
        name: payload.name,
        email: payload.email,
      };
      return newState;
    },

    // addItemToFavorite: (state: any, { payload }) => {
    //   const newState = {
    //     ...state,
    //     favorites: [...state.favorites, payload],
    //   };

    //   localStorage.setItem("userInfo", JSON.stringify(newState));

    //   return newState;
    // },

    // removeItemFromFavorite: (state: any, { payload }) => {
    //   // const userDataFromLocal = localStorage.getItem("userInfo");

    //   const newState = {
    //     ...state,
    //     favorites: state.favorites.filter((item: string) => item !== payload),
    //   };

    //   localStorage.setItem("userInfo", JSON.stringify(newState));

    //   return newState;
    // },

    // resetFavoritesWithNewValue: (state: any, { payload }) => {
    //   const newState = {
    //     ...state,
    //     favorites: payload,
    //   };
    //   return newState;
    // },
  },
});

export default authSlice;
