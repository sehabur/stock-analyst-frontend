"use client";
import {
  Box,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Button,
  IconButton,
  Chip,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { fundamentalsTooltip } from "@/data/info";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export default function FinancialCard(props: any) {
  const {
    data,
    title,
    unit = "",
    divideFactor = 1,
    titleShort,
    dialogtype,
    handleItemClick,
  } = props;

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
      marginLeft: 2,
      fontSize: 14,
      padding: "12px",
    },
  }));

  return (
    <>
      <Card
        elevation={0}
        // variant="outlined"
        sx={{
          "& .MuiCard-root": {
            "& :hover": {
              bgcolor: "transparent",
            },
          },
          "& .MuiCardContent-root:last-child": { pb: 0.3 },
          borderRadius: 1.5,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ bgcolor: "financeCardTitlecolor", px: 2, py: 1.2 }}
          >
            <Typography
              onClick={() => handleItemClick(dialogtype)}
              color="primary.main"
              sx={{
                textAlign: "left",
                fontSize: ".92rem",
                fontWeight: 700,
                p: 0,
                m: 0,
                ":hover": {
                  bgcolor: "transparent",
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
            >
              {matchesSmUp ? title : titleShort}
            </Typography>
            <CustomTooltip
              placement="top"
              title={fundamentalsTooltip[dialogtype]?.definition}
              enterTouchDelay={10}
              leaveTouchDelay={3000}
            >
              <IconButton
                disableRipple
                sx={{
                  p: 0,
                  m: 0,
                  ":hover": {
                    bgcolor: "transparent",
                    color: "primary.main",
                  },
                }}
              >
                <HelpOutlineRoundedIcon sx={{ fontSize: "1.2rem" }} />
              </IconButton>
            </CustomTooltip>
          </Stack>
          <Box>
            <Stack
              direction={matchesSmUp ? "row" : "column"}
              alignItems={matchesSmUp ? "center" : "flex-start"}
              sx={{
                px: 2,
                py: 0,
                mx: 0,
                mt: 0.8,
                mb: 0.5,
                ":hover": {
                  bgcolor: "transparent",
                },
              }}
              component={Button}
              disableRipple
              onClick={() => handleItemClick(dialogtype)}
            >
              <Stack direction="row" alignItems="baseline">
                <Typography
                  color="text.primary"
                  sx={{
                    fontSize: { xs: "1.4rem", sm: "1.6rem" },
                    fontWeight: 500,
                  }}
                >
                  {data?.value && (data.value / divideFactor).toFixed(2)}
                </Typography>
                <Typography
                  sx={{ fontSize: "1.1rem", ml: 0.5, color: "text.secondary" }}
                >
                  {unit}
                </Typography>
              </Stack>

              <Chip
                label={data?.period}
                // variant="outlined"
                size="small"
                // color="info"
                sx={{
                  ml: { xs: 0, sm: 2 },
                  fontSize: ".9rem",
                  display: data?.period ? "block" : "none",
                }}
              />
            </Stack>
            <Divider light />
            <Typography
              component={Button}
              disableRipple
              onClick={() => handleItemClick(dialogtype)}
              sx={{
                color: data?.color || "text.secondary",
                fontSize: ".9rem",
                fontWeight: 500,
                px: 2,
                py: 1,
                ":hover": {
                  bgcolor: "transparent",
                },
                textAlign: "left",
              }}
            >
              {data?.comment || "--"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
