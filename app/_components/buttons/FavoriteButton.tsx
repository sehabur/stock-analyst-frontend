"use client";
import React from "react";
import { favoriteActions } from "_store";
import { useDispatch, useSelector } from "react-redux";

import { styled, alpha } from "@mui/material/styles";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, useTheme } from "@mui/material";

import Snackbar from "@mui/material/Snackbar/Snackbar";
import ToastMessage from "../shared/ToastMessage";

export default function FavoriteButton({ tradingCode }: any) {
  const dispatch = useDispatch();

  const theme: any = useTheme();

  const auth = useSelector((state: any) => state.auth);

  const favorite = useSelector((state: any) => state.favorite);

  const [isFavorite, setIsFavorite] = React.useState(
    favorite?.includes(tradingCode)
  );

  const [toastMessage, setToastMessage] = React.useState({
    text: "",
    severity: "success",
  });

  const [openToast, setOpenToast] = React.useState(false);

  const handleToastClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  const handleFavorite = async (favorite: any) => {
    if (!auth?.isLoggedIn) {
      setToastMessage({
        text: "Please login to save favorites",
        severity: "error",
      });
      setOpenToast(true);
      return;
    }

    setIsFavorite(favorite);

    const type = favorite ? "add" : "remove";

    try {
      const res = await fetch(`/api/favorite`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({
          tradingCode,
          type,
          userId: auth?._id,
        }),
      });
      const data = await res.json();

      setToastMessage({
        text: data.message,
        severity: "success",
      });

      favorite
        ? dispatch(favoriteActions.addItemToFavorite(tradingCode))
        : dispatch(favoriteActions.removeItemFromFavorite(tradingCode));

      setOpenToast(true);
    } catch (error) {
      setToastMessage({
        text: "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <>
      <ToastMessage
        open={openToast}
        onClose={handleToastClose}
        severity={toastMessage.severity}
        message={toastMessage.text}
      />
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          borderRadius: 2,
          border: `1.2px solid ${
            isFavorite
              ? alpha(theme.palette.error.main, 0.5)
              : alpha(theme.palette.primary.main, 0.5)
          }`,
          bgcolor: isFavorite
            ? alpha(theme.palette.error.main, 0.07)
            : alpha(theme.palette.primary.main, 0.05),
          mr: 1.5,
          px: 1.2,
          py: 1.2,
        }}
        onClick={() => handleFavorite(!isFavorite)}
      >
        {isFavorite ? (
          <FavoriteOutlinedIcon color="error" />
        ) : (
          <FavoriteBorderRoundedIcon color="primary" />
        )}
      </IconButton>
    </>
  );
}
