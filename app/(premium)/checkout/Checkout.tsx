"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Checkout() {
  const auth = useSelector((state: any) => state.auth);

  const searchParams = useSearchParams();

  const router = useRouter();

  const price = searchParams.get("price");
  const product = searchParams.get("product");
  const validity = searchParams.get("validity");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("a", product);

    try {
      const res = await fetch(`/api/payment?product=${product}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        const { url } = data;
        router.push(url);
      }
    } catch (error) {}
  };
  return (
    <>
      <Box sx={{ px: 2, pb: 4, maxWidth: 400, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mt: 2, mb: 3 }}>
          <Typography
            color="success.main"
            sx={{
              fontSize: "1.3rem",
              fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            {price} BDT for {validity}
          </Typography>
        </Box>
        <Box>
          <img
            src="/images/ssl-banner.jpg"
            width="100%"
            style={{ borderRadius: "4px" }}
          />
        </Box>

        <Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit}>
          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label={
                <Box
                  sx={{
                    display: "flex",
                    color: "text.primary",
                  }}
                >
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
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 4 }}>
            Pay now
          </Button>
        </Box>
      </Box>
    </>
  );
}
