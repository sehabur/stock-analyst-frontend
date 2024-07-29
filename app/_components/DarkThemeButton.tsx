"use client";
import { FormControlLabel, Switch } from "@mui/material";
import { themeColorActions } from "_store";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { useState } from "react";

export default function DarkThemeButton() {
  const dispatch = useDispatch();
  const themeColor = useSelector((state: any) => state.themeColor);

  const handleChange = (e: any) => {
    const theme = e.target.checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    dispatch(themeColorActions.setThemeColor(theme));
  };

  return (
    <Stack direction="row" alignItems="center" sx={{ px: 2.3, py: 1.5 }}>
      <FormControlLabel
        sx={{ ".MuiFormControlLabel-label": { fontSize: "1rem", ml: 0.2 } }}
        value="colorMode"
        control={
          <Switch
            color="primary"
            onClick={handleChange}
            size="small"
            checked={themeColor === "dark"}
          />
        }
        label="Dark color theme"
        labelPlacement="end"
      />
    </Stack>
  );
}
