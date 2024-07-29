"use client";
import { Box, Typography, Card, CardContent } from "@mui/material";

export default function OverviewCard(props: any) {
  const { title, data } = props;

  return (
    <>
      <Card
        elevation={0}
        sx={{
          "& .MuiCardContent-root:last-child": { pb: 0 },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ bgcolor: "overviewHeader", px: 2, py: 0.7 }}>
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ bgcolor: "secondaryBackground", px: 2, py: 0.5 }}>
            <Typography sx={{ fontSize: "1.7rem", fontWeight: 500 }}>
              {data}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
