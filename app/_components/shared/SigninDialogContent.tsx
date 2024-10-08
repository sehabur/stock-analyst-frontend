"use client";
import { Box, Typography, DialogContent, Avatar } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// import Link from "next/link";
// import { useSelector } from "react-redux";

import SignInComp from "../../(users)/signin/SignInComp";

export default function SigninDialogContent({
  redirect,
  externalDialogClose,
}: any) {
  return (
    <>
      <DialogContent>
        <Box sx={{ maxWidth: 400, mx: "auto", py: 3, px: { xs: 0, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: { xs: 1, sm: 3 },
            }}
          >
            <Avatar sx={{ m: 1, mb: 2, bgcolor: "text.secondary" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              color="text.primary"
              sx={{
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.4rem",
                  textAlign: "center",
                },
              }}
            >
              Please sign in to use this feature
            </Typography>
          </Box>
          <Box sx={{ pb: 2, maxWidth: 400, mx: "auto" }}>
            <SignInComp
              redirect={redirect}
              externalDialogClose={externalDialogClose}
            />
          </Box>
        </Box>
      </DialogContent>
    </>
  );
}
