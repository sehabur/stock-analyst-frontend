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
        <Box sx={{ maxWidth: 480, mx: "auto", py: { xs: 2, sm: 4 } }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Avatar sx={{ width: 70, height: 70 }}>
                <WorkspacePremiumRoundedIcon sx={{ fontSize: 42 }} />
              </Avatar>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "text.primary",
                  lineHeight: 1,
                }}
                gutterBottom
              >
                Premium feature
              </Typography>
              <Typography
                sx={{
                  fontSize: ".9rem",
                  fontWeight: 500,
                  color: "text.primary",
                  maxWidth: 280,
                }}
              >
                Please subscribe to premium package to access this feature
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography sx={{ fontSize: "1rem", color: "text.secondary" }}>
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
              sx={{ py: 1.5, px: 2.5, fontSize: "1.1rem", borderRadius: 1 }}
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
