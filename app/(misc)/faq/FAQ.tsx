"use client";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { faqItems } from "@/data/info";

export default function FAQ() {
  // const [expanded, setExpanded] = React.useState<string | false>(0);

  // const handleChange =
  //   (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? panel : false);
  //   };

  return (
    <Container
      id="faq"
      sx={{
        py: 4,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {faqItems.map((item: any, index: number) => (
          <Box key={index}>
            {index != 0 && <Divider />}
            <Box sx={{ my: 0.8 }}>
              <Accordion
                // expanded={expanded === "panel1"}
                // onChange={handleChange(index)}
                elevation={0}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontSize: "1rem" }}>{item.ques}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    gutterBottom
                    sx={{ maxWidth: { xs: "100%", md: "80%" } }}
                  >
                    {item.ans}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
