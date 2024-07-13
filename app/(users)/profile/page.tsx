import React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Profile from "./Profile";

// async function getUserById(id: any) {
//   const res = await fetch(
//     `${process.env.BACKEND_URL}/api/users/profile/${id}`,
//     {
//       next: { revalidate: 0 },
//     }
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

export default async function ProfilePage() {
  // const { id } = params;

  // const userDetails = await getUserById(id);

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ maxWidth: "850px", mx: "auto", pt: 3, pb: 6, px: 2 }}>
        <Profile />
      </Box>
    </Box>
  );
}
