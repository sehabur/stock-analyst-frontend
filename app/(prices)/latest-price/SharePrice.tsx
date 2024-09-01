"use client";
import {
  useTheme,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";

import PriceTable from "./PriceTable";
import PriceCard from "./PriceCard";
import { useSearchParams } from "next/navigation";

import { useSelector } from "react-redux";
import React from "react";
import { sectorList } from "@/data/dse";

export default function SharePrice() {
  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const searchParams = useSearchParams();
  const sector: any = searchParams.get("sector");

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const initSharelist = latestPrice.filter((item: any) => item.type == "stock");

  const [shares, setShares] = React.useState<any>(initSharelist);

  const [sectorFormInputs, setSectorFormInputs] = React.useState(
    sector || "all"
  );

  const filterShares = (sector: string) => {
    if (!shares) return [];
    let shareData = [];
    if (sector !== "all") {
      shareData = initSharelist.filter(
        (share: any) =>
          share.type === "stock" &&
          share?.sector?.split(" ")[0].toLowerCase() === sector
      );
    } else {
      shareData = initSharelist;
    }
    return shareData;
  };

  const handleFormChange = (event: any) => {
    const value = event.target.value;
    setShares(filterShares(value));
    setSectorFormInputs(value);
  };

  console.log(latestPrice, initSharelist, shares);

  return (
    <>
      <Box sx={{ textAlign: { xs: "right", sm: "left" } }}>
        <TextField
          select
          name="sector"
          value={sectorFormInputs}
          onChange={handleFormChange}
          size="small"
          variant="outlined"
          sx={{
            width: { xs: "inherit", sm: 300 },
            mb: 1,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Sector:</InputAdornment>
            ),
          }}
        >
          <MenuItem key="all" value="all">
            All
          </MenuItem>
          {sectorList.map((option: any) => (
            <MenuItem key={option.tag} value={option.tag}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {matchesSmUp && <PriceTable data={shares} />}
      {matchesSmDown && <PriceCard data={shares} />}
    </>
  );
}
