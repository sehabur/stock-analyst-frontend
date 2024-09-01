import React from "react";

import { Box } from "@mui/material";

import MobileViewPriceCard from "@/components/cards/MobileViewPriceCard";

export default function PriceCard(props: any) {
  const { data } = props;

  return (
    <Box sx={{ my: 2 }}>
      {data?.map((item: any, index: number) => (
        <Box key={index}>
          <MobileViewPriceCard item={item} />
        </Box>
      ))}
    </Box>
  );
}
