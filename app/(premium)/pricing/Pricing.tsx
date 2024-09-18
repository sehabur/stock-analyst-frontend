"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

import PricingCard from "./PricingCard";
import FreeTrialCard from "./FreeTrialCard";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";

export default function Pricing({ packages }: any) {
  const auth = useSelector((state: any) => state.auth);

  const router = useRouter();

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleCardClick = async (event: any, itemInfo: any) => {
    event.preventDefault();

    if (!auth?.isLoggedIn) {
      router.push("/signin?redirect=/pricing");
      return;
    }
    try {
      const res = await fetch(`/api/generate-otp`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        // const { type, currentPrice, title, product } = itemInfo;

        const queryString = new URLSearchParams(itemInfo).toString();

        if (itemInfo.type == "free_trial") {
          router.push(
            auth?.isFreeTrialUsed ? "#" : `/verify-phone?${queryString}`
          );
        } else {
          router.push(`/verify-phone?${queryString}`);
        }
      } else {
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <>
      {errorMessage && (
        <Box
          sx={{
            maxWidth: 400,
            mx: "auto",
            mb: 1,
          }}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          direction: "row",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          pb: 4,
          maxWidth: 1050,
          mx: "auto",
          rowGap: { xs: 0, sm: 3 },
          columnGap: 1,
        }}
      >
        <Box>
          <FreeTrialCard handleCardClick={handleCardClick} />
        </Box>
        {packages?.map((item: any, index: number) => (
          <PricingCard
            handleCardClick={handleCardClick}
            data={item}
            key={index}
          />
        ))}
      </Box>
    </>
  );
}
