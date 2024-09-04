import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SystemUpdateRoundedIcon from "@mui/icons-material/SystemUpdateRounded";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh" }}
    >
      <Box
        sx={{
          pt: 6,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: "text.secondary" }}>
          <SystemUpdateRoundedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5" color="text.primary">
          Premium package
        </Typography>
        <Typography color="primary.main" sx={{ fontSize: "1.2rem", mt: 1 }}>
          149 BDT (1 Month)
        </Typography>
      </Box>
      <Box sx={{ px: 2, pb: 4, maxWidth: 400, mx: "auto" }}>
        <img src="/images/ssl-banner.jpg" width="100%" />
        <Box>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Box sx={{ display: "flex" }}>
                  <Typography>
                    I have read and agree to the{" "}
                    <Typography
                      component={Link}
                      sx={{
                        textDecoration: "underline",
                        color: "primary.main",
                      }}
                      href="/terms"
                    >
                      Terms & Conditions
                    </Typography>
                    ,{" "}
                    <Typography
                      component={Link}
                      sx={{
                        textDecoration: "underline",
                        color: "primary.main",
                      }}
                      href="/privacy-policy"
                    >
                      Privacy Policy
                    </Typography>{" "}
                    and{" "}
                    <Typography
                      component={Link}
                      sx={{
                        textDecoration: "underline",
                        color: "primary.main",
                      }}
                      href="/refund-policy"
                    >
                      Refund Policy
                    </Typography>
                  </Typography>
                </Box>
              }
            />
          </FormGroup>
        </Box>
        <Button fullWidth variant="contained" sx={{ mt: 4 }}>
          Pay now
        </Button>
      </Box>
    </Box>
  );
}
