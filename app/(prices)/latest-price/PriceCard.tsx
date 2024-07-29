import React from "react";

import { Box, TextField, MenuItem, InputAdornment } from "@mui/material";

import MobileViewPriceCard from "@/components/cards/MobileViewPriceCard";
import { sectorList } from "@/data/dse";

export default function PriceCard(props: { data: Array<{}>; sector: any }) {
  const { data, sector } = props;

  const filterInitialShares = (sector: string) => {
    let shareData = [];
    if (sector) {
      shareData = data.filter(
        (share: any) => share.sector.split(" ")[0].toLowerCase() === sector
      );
    } else {
      shareData = data;
    }
    return shareData;
  };

  const [shares, setShares] = React.useState(filterInitialShares(sector));

  const [sectorFormInputs, setSectorFormInputs] = React.useState(
    sector || "all"
  );

  const handleFormChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    let newData = [];
    if (value !== "all") {
      newData = data.filter(
        (share: any) => share.sector.split(" ")[0].toLowerCase() === value
      );
    } else {
      newData = data;
    }
    setSectorFormInputs(value);
    setShares(newData);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ textAlign: "right" }}>
        <TextField
          select
          name="sector"
          value={sectorFormInputs}
          onChange={handleFormChange}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Sector:</InputAdornment>
            ),
          }}
        >
          <MenuItem key="all" value="all">
            All Sectors
          </MenuItem>
          {sectorList.map((option: any) => (
            <MenuItem key={option.tag} value={option.tag}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {shares.map((item: any, index: number) => (
        <Box key={index}>
          <MobileViewPriceCard item={item} />
        </Box>
      ))}
    </Box>
  );
}
