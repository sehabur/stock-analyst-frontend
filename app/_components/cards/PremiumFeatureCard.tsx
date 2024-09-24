import React from "react";

import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export default function PremiumFeatureCard({ item }: any) {
  return (
    <>
      <Card
        sx={{ borderRadius: 3, pt: 1, pl: 1, bgcolor: "background.default" }}
        variant="outlined"
      >
        <CardContent sx={{ pb: 0 }}>
          <Avatar
            sx={{
              // bgcolor: "text.secondary",
              bgcolor: item.color,
              // borderRadius: 2,
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ mt: 2 }}>
            <Typography
              fontWeight="medium"
              gutterBottom
              color="text.primary"
              sx={{ fontSize: "1.3rem" }}
            >
              {item.title}
            </Typography>
            <Typography color="text.secondary" fontSize=".95rem">
              {item.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
