import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 50,
  backgroundColor: alpha(theme.palette.text.primary, 0.07),
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.secondary, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  //   width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 270,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchBar() {
  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search shares"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </Box>
  );
}
