import { Box } from "@mui/material";

import SharePrice from "./SharePrice";

// async function getData() {
//   const res = await fetch(`${process.env.BACKEND_URL}/api/prices/latestPrice`, {
//     next: { revalidate: 0 },
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

export default async function Page() {
  // const response = await getData();

  // const data = response.filter(
  //   (item: any) => !["00DSEX", "00DSES", "00DS30"].includes(item.tradingCode)
  // );

  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: { xs: "100vw", sm: "1475px" },
          mx: "auto",
          py: 2,
          px: 2,
        }}
      >
        <SharePrice />
      </Box>
    </Box>
  );
}
