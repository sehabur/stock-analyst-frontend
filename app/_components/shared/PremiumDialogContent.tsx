"use client";
import {
  Box,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Button,
  DialogContent,
  Avatar,
} from "@mui/material";

import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function PremiumDialogContent(props: any) {
  const auth = useSelector((state: any) => state.auth);

  const theme: any = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <DialogContent>
        <Box sx={{ maxWidth: "700px", mx: "auto", py: 2 }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Box>
              <Avatar sx={{ width: 60, height: 60 }}>
                <WorkspacePremiumRoundedIcon sx={{ fontSize: 42 }} />
              </Avatar>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "text.primary",
                  lineHeight: 1.1,
                }}
                gutterBottom
              >
                Premium feature
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Please subscribe to premium package to access this feature
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography sx={{ fontSize: "1rem" }}>
              Elevate your investing potential with a Premium membership. Gain
              personalised and actionable insights with enhanced features to
              maximise your investments!
            </Typography>
          </Box>

          <Box>
            {/* <Button
              variant="outlined"
              sx={{ mr: 2, py: 1.3 }}
              component={Link}
              href="/signin"
            > 
              Sign in
            </Button> */}
            <Button
              variant="contained"
              sx={{ py: 1, px: 4, fontSize: "1.1rem", borderRadius: 1 }}
              component={Link}
              fullWidth={matchesSmDown}
              href={auth?.isLoggedIn ? "/pricing" : "/signup?redirect=/pricing"}
            >
              Get 14 days free trial
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </>
  );
}
