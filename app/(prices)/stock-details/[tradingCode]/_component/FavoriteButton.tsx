"use client";

import React from "react";

import { styled, alpha } from "@mui/material/styles";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "_store";
import Snackbar from "@mui/material/Snackbar/Snackbar";

export default function FavoriteButton({ tradingCode }: any) {
  const dispatch = useDispatch();
  const theme: any = useTheme();

  const auth = useSelector((state: any) => state.auth);

  const checkFav = auth?.favorites?.includes(tradingCode);

  const [isFavorite, setIsFavorite] = React.useState(checkFav);

  const [message, setMessage] = React.useState("");

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

      setMessage(data.message);

      favorite
        ? dispatch(authActions.addItemToFavorite(tradingCode))
        : dispatch(authActions.removeItemFromFavorite(tradingCode));

      setOpenToast(true);
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleToastClose}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleToastClose}
          >
            <CloseIcon />
          </IconButton>
        }
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
