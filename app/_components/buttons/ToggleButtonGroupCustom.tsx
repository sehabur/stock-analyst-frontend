import * as React from 'react'
import { styled } from '@mui/material/styles'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup, {
  toggleButtonGroupClasses
} from '@mui/material/ToggleButtonGroup'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: 3
  }
}))
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.MuiToggleButtonGroup-grouped': {
    borderRadius: '24px !important',
    marginRight: '16px',
    border: `1px solid lightgrey !important`,
    paddingLeft: '18px',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingRight: '18px'
  },
  color: theme.palette.primary.main,
  fontSize: '.9rem',
  textTransform: 'none'
}))

export default function CustomizedDividers () {
  const [alignment, setAlignment] = React.useState('left')
  const [formats, setFormats] = React.useState(() => ['italic'])

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats)
  }

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment)
  }

  return (
    <div>
      <StyledToggleButtonGroup
        sx={{ border: 0, py: 0 }}
        size='small'
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label='text alignment'
      >
        <StyledToggleButton sx={{}} value='center' aria-label='centered'>
          Daily
        </StyledToggleButton>
        <StyledToggleButton value='right' aria-label='right aligned'>
          Yearly
        </StyledToggleButton>
        <StyledToggleButton value='justify' aria-label='justified'>
          5 Year
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    </div>
  )
}
