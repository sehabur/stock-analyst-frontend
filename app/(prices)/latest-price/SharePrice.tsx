"use client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PriceTable from "./PriceTable";
import PriceCard from "./PriceCard";
import { useSearchParams } from "next/navigation";

import { useSelector } from "react-redux";

export default function SharePrice() {
  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const searchParams = useSearchParams();
  const sector = searchParams.get("sector");

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const data = latestPrice.filter(
    (item: any) => !["00DSEX", "00DSES", "00DS30"].includes(item.tradingCode)
  );

  return (
    <>
      {matchesSmUp && <PriceTable data={data} sector={sector} />}
      {matchesSmDown && <PriceCard data={data} sector={sector} />}
    </>
  );
}
