import { Box, Card, CardContent, Paper } from "@mui/material";
import SectorChart from "./SectorChart";
import { sectorList } from "@/data/dse";
import Typography from "@mui/material/Typography";
import Link from "next/link";

async function getData(sectorTag: string) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/dailySectorPrice/${sectorTag}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateStaticParams() {
  return sectorList.map((item: { tag: string }) => ({
    sector: item.tag,
  }));
}

export default async function Sector({ params }: any) {
  const { sector: sectorTag } = params;

  const data = await getData(sectorTag);

  const sector = sectorList.find((item: any) => item.tag === sectorTag).name;

  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          py: 2,
          px: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "text.secondary",
              mt: { xs: 0, sm: 2 },
              mb: 3,
            }}
          >
            {sector} sector chart
          </Typography>
          <SectorChart data={data} />
        </Box>
        <Box sx={{ mt: 6, mb: 6 }}>
          <Typography
            sx={{ fontSize: "1.5rem", color: "text.secondary", mb: 2 }}
          >
            Other Sectors
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              // justifyContent: "center",
            }}
          >
            {sectorList
              .filter((item: any) => item.tag !== sectorTag)
              .map((item: any, index: number) => (
                <Paper
                  key={index}
                  sx={{
                    mx: { xs: 1, sm: 1.5 },
                    my: { xs: 0.6, sm: 1 },
                    px: 2,
                    py: 1,
                    minWidth: 80,
                    textAlign: "center",
                    borderRadius: 2,
                    ":hover": {
                      bgcolor: "secondaryBackground",
                      cursor: "pointer",
                    },
                  }}
                  component={Link}
                  href={`/sector/chart/${item.tag}`}
                  variant="outlined"
                >
                  <Typography
                    sx={{ fontSize: { xs: ".875rem", sm: "1rem" } }}
                    color="primary.main"
                  >
                    {item.name}
                  </Typography>
                </Paper>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
