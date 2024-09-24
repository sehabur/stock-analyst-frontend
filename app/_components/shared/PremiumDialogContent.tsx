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
  Paper,
} from "@mui/material";

import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function PremiumDialogContent({ variant = "elevation" }: any) {
  const auth = useSelector((state: any) => state.auth);

  const theme: any = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <DialogContent>
        <Paper
          elevation={0}
          variant={variant}
          sx={{ maxWidth: 550, mx: "auto", p: { xs: 2, sm: 4 } }}
        >
          <Stack direction="row" alignItems="center" gap={4}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Avatar sx={{ width: 70, height: 70 }}>
                <WorkspacePremiumRoundedIcon sx={{ fontSize: 45 }} />
              </Avatar>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "1.8rem", sm: "2rem" },
                  fontWeight: 700,
                  color: "text.primary",
                  lineHeight: 1,
                  mb: 2,
                }}
              >
                Premium Content
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "text.primary",
                  maxWidth: 300,
                }}
              >
                Please subscribe to premium package to access this feature
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 3, mb: 3 }}>
            <Typography sx={{ fontSize: "1rem", color: "text.secondary" }}>
              Elevate your investing potential with a Premium membership. Gain
              personalised and actionable insights with enhanced features to
              maximise your investments!
            </Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              sx={{ py: 1.5, px: 3, borderRadius: 1 }}
              component={Link}
              fullWidth={matchesSmDown}
              href="/pricing"
            >
              Get 14 days free trial
            </Button>
          </Box>
        </Paper>
      </DialogContent>
    </>
  );
}
