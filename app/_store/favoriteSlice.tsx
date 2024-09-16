import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    setData: (state: any, { payload }: { payload: any }) => {
      return payload;
    },

    clearData: () => {
      return [];
    },

    addItemToFavorite: (state: any, { payload }: { payload: any }) => {
      let newstate = state;
      newstate.push(payload);
      return newstate;
    },

    removeItemFromFavorite: (state: any, { payload }) => {
      const newState = state.filter((item: any) => item !== payload);
      return newState;
    },

    resetFavoritesWithNewValue: (state: any, { payload }) => {
      return payload;
    },
  },
});

export default favoriteSlice;
