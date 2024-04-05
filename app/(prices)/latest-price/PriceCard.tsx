import { sectorList } from "@/data/dse";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import React from "react";

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

      {shares.map((item: any) => (
        <Box
          component={Link}
          href={`/stock-details/${item.tradingCode}`}
          key={item.tradingCode}
        >
          <Paper
            sx={{
              my: 1.3,
              px: 1.5,
              py: 1.3,
              borderRadius: 2,
            }}
            elevation={0}
            variant="outlined"
          >
            <Grid container alignItems="center">
              <Grid item xs={10}>
                <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "text.primary",
                      mr: 1,
                    }}
                  >
                    {item.tradingCode}
                  </Typography>
                  <Chip
                    label={item.category}
                    size="small"
                    // color="primary"
                    variant="outlined"
                    sx={{
                      borderRadius: "50%",
                      mr: 2,
                      p: 0,
                    }}
                  />

                  {item.change !== 0 && (
                    <Chip
                      label={item.change}
                      size="small"
                      sx={{
                        borderRadius: 1,
                        mr: 1,
                        color:
                          item.change === 0
                            ? "primary.main"
                            : item.change < 0
                            ? "error.main"
                            : "success.main",
                      }}
                    />
                  )}

                  <Chip
                    label={`${item.change}%`}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      color:
                        item.change === 0
                          ? "primary.main"
                          : item.change < 0
                          ? "error.main"
                          : "success.main",
                    }}
                  />
                </Stack>
                <Typography sx={{ fontSize: ".8rem" }} color="text.secondary">
                  Vol: {item.volume} | Val: {(item.value / 10).toFixed(2)}cr |
                  Trd: {item.trade}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Stack alignItems="flex-end" sx={{ mr: 0.7 }}>
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 500,
                      color:
                        item.change === 0
                          ? "primary.main"
                          : item.change < 0
                          ? "error.main"
                          : "success.main",
                    }}
                  >
                    {item.ltp}
                  </Typography>
                  <Typography sx={{ fontSize: ".7rem" }} color="text.secondary">
                    BDT
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ))}
    </Box>
  );
}
