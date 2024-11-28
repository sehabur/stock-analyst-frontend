"use client";
import React from "react";
import Datafeed from "./datafeed";
import { TradingView } from "../../_library/charting_library/charting_library.standalone";
import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";

import { useSearchParams } from "next/navigation";

import { useSelector } from "react-redux";
import ToastMessage from "@/components/shared/ToastMessage";

interface MyWindow extends Window {
  myFunction(): void;
  tvWidget: any;
}

declare const window: MyWindow;

const tvWidget: any = TradingView;

export default function TradingviewChart() {
  const theme: any = useTheme();

  const searchParams: any = useSearchParams();

  const symbol = decodeURIComponent(searchParams.get("symbol"));

  const auth = useSelector((state: any) => state.auth);

  const [toastMessage, setToastMessage] = React.useState("");

  const [toastOpen, setToastOpen] = React.useState(false);

  const handleToastColse = () => {
    setToastOpen(false);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/jsx";
    script.src = "/public/charting_library/charting_library.js";

    document.head.appendChild(script);

    var widget = (window.tvWidget = new tvWidget.widget({
      container: "tv_chart_container",
      datafeed: Datafeed,
      library_path: "/charting_library/",
      // fullscreen: true,
      autosize: true,
      symbol: symbol,
      interval: "1D",
      timezone: "Asia/Dhaka",
      theme: theme.palette.mode,
      locale: "en",
      header_widget_buttons_mode: "fullsize",
      loading_screen: {
        backgroundColor: theme.palette.background.default,
        foregroundColor: theme.palette.primary.main,
      },
      enabled_features: [
        "study_templates",
        "side_toolbar_in_fullscreen_mode",
        "header_in_fullscreen_mode",
      ],
      debug: true,
      save_load_adapter: {
        // Charts //
        getAllCharts: async function () {
          console.log("getAllCharts");
          try {
            const res = await fetch(`/api/chart?getType=all`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
              },
            });
            const data = await res.json();

            if (res.ok) {
              return data;
            } else {
              if (res.status === 401) {
                setToastMessage("Please signin to access chart layout");
                setToastOpen(true);
              }
              return null;
            }
          } catch (error) {
            console.error(error);
          }
        },

        removeChart: async function (chartId: any) {
          console.log("removeChart");
          try {
            const res = await fetch(`/api/chart?id=${chartId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
              },
            });
            const data = await res.json();
            if (res.ok) {
              return data;
            } else {
              if (res.status === 401) {
                setToastMessage("Please signin to access chart layout");
                setToastOpen(true);
              }
              return null;
            }
          } catch (error) {
            console.error(error);
          }
        },

        saveChart: async function (chartData: { id: string }) {
          console.log("saveChart");
          try {
            const res = await fetch(`/api/chart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
              },
              body: JSON.stringify(chartData),
            });
            const data = await res.json();
            if (res.ok) {
              console.log("Saved successfully");
              return data;
            } else {
              if (res.status === 401) {
                setToastMessage("Please signin to access chart layout");
                setToastOpen(true);
              }
              return null;
            }
          } catch (error) {
            console.error(error);
          }
        },

        getChartContent: async function (chartId: any) {
          console.log("getChartContent");
          try {
            const res = await fetch(
              `/api/chart?getType=content&id=${chartId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${auth?.token}`,
                },
              }
            );

            const { content } = await res.json();
            if (res.ok) {
              return content;
            } else {
              if (res.status === 401) {
                setToastMessage("Please signin to access chart layout");
                setToastOpen(true);
              }
              return null;
            }
          } catch (error) {
            console.error(error);
          }
        },

        // Study Template //

        removeStudyTemplate: async function (studyTemplateData: { name: any }) {
          console.log("removeStudyTemplate");
          try {
            const res = await fetch(
              `/api/study-template?name=${studyTemplateData.name}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${auth?.token}`,
                },
              }
            );
            const data = await res.json();
            if (res.ok) {
              return data;
            } else {
              if (res.status === 401) {
                setToastMessage("Please signin to access study templates");
                setToastOpen(true);
              }
              return null;
            }
          } catch (error) {
            console.error(error);
          }
        },

        getStudyTemplateContent: async function (studyTemplateData: {
          name: any;
        }) {
          console.log("getStudyTemplateContent");
          try {
            const res = await fetch(
              `/api/study-template?getType=content&name=${studyTemplateData.name}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${auth?.token}`,
                },
              }
            );

            const { content } = await res.json();
            if (res.ok) {
              return content;
            } else {
              if (res.status === 401) {
                setToastMessage("Please signin to access study templates");
                setToastOpen(true);
              }
              return null;
            }
          } catch (error) {
            console.error(error);
          }
        },

        saveStudyTemplate: async function (studyTemplateData: {}) {
          console.log("saveStudyTemplate");
          try {
            const res = await fetch(`/api/study-template`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
              },
              body: JSON.stringify(studyTemplateData),
            });
            const data = await res.json();
            if (res.ok) {
              console.log("Saved successfully");
              return data;
            } else {
              if (res.status === 401) {
                setToastMessage("Please signin to access study templates");
                setToastOpen(true);
              }
              return null;
            }
          } catch (error) {
            console.error(error);
          }
        },

        getAllStudyTemplates: async function () {
          console.log("getAllStudyTemplates");
          try {
            const res = await fetch(`/api/study-template?getType=all`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
              },
            });
            const data = await res.json();
            if (res.ok) {
              return data;
            } else {
              // if (res.status === 401) {
              //   setToastMessage("Please signin to access study templates");
              //   setToastOpen(true);
              // }
              return null;
            }
          } catch (error) {
            console.error(error);
          }
        },
      },
    }));

    // widget.onChartReady(() => {
    //   widget
    //     .activeChart()
    //     .createStudy("Moving Average", false, false, { length: 5 });
    // });

    return () => script.remove();
  }, [symbol, auth, theme]);

  return (
    <Box
      component="div"
      id="tv_chart_container"
      sx={{
        width: "100%",
        height: "100%",
        py: 2,
        px: 2,
      }}
    >
      <ToastMessage
        open={toastOpen}
        onClose={handleToastColse}
        severity="warning"
        message={toastMessage}
      />
    </Box>
  );
}
