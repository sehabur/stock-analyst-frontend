"use client";
import {
  Box,
  Typography,
  Stack,
  Button,
  DialogContent,
  DialogTitle,
  useTheme,
  useMediaQuery,
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
      <DialogTitle>Account creation successfull</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ maxWidth: "700px", mx: "auto", py: 2 }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Box>
              <WorkspacePremiumRoundedIcon
                sx={{ fontSize: 40 }}
                color="warning"
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "text.primary",
                  lineHeight: 1.1,
                }}
              >
                Premium membership
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Subscribe to a premium package to access all features
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 4, ml: 1, mb: 4 }}>
            <Typography sx={{ fontSize: "1rem" }}>
              Elevate your investing potential with a Premium membership. Gain
              personalised and actionable insights with enhanced features to
              maximise your investments!
            </Typography>
          </Box>

          <Box sx={{ ml: 1 }}>
            <Button
              variant="outlined"
              sx={{ mr: 2, py: 1.3 }}
              component={Link}
              href="/"
            >
              Skip for now
            </Button>
            <Button
              variant="contained"
              sx={{ py: 1.3, px: 3, fontSize: "1.1rem" }}
              component={Link}
              href="/pricing"
              fullWidth={matchesSmDown}
            >
              Get started for free
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </>
  );
}
