"use client";
import {
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";

export default function FundamentalInfoCard(props: any) {
  const { text } = props;

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Card
        elevation={0}
        sx={{
          bgcolor: "financeInfoCard",
          mx: { xs: 0, sm: 2 },
          mb: 2,
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="flex-start" spacing={2}>
            {matchesSmUp && <InfoIcon color="info" />}
            <Typography>
              {text}
              {/* <Typography
                component={Link}
                target="_blank"
                href={href}
                sx={{
                  color: "primary.main",
                  textDecoration: "underline",
                  ml: 1,
                }}
              >
                Learn more
              </Typography> */}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
