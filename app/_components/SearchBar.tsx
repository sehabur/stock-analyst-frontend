import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 50,
  backgroundColor: alpha(theme.palette.primary.main, 0.07),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 12,
  width: 200,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: 18,
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1.4, 1),
    paddingLeft: 48,
    transition: theme.transitions.create("width"),
  },
}));

export default function SearchBar({ onClick }: any) {
  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon color="primary" />
        </SearchIconWrapper>
        <StyledInputBase
          readOnly
          onClick={onClick}
          placeholder="Search stocks"
        />
      </Search>
    </Box>
  );
}
