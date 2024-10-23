/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
"use client";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import Header from "./_components/Header";
import store from "./_store";
import { Provider } from "react-redux";
import React from "react";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import Footer from "./_components/Footer";
import DisableCopyPaste from "./_components/shared/DisableCopyPaste";
import GoogleAnalytics from "./_components/analytics/googleAnalytics";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <head>
        {/* <title>Stocksupporter - Stock Analysis Tool for DSE</title>
        <meta
          name="description"
          content="Get finacial data and prepared analytics for Dhaka Stock Exchange (DSE) stocks helping you find the perfect trade."
        ></meta>
        <meta
          name="keywords"
          content="DSE,DSEX,DS30,DSES,Dhaka Stock Exchange,Stocksupporter,Stock supporter,Bangladesh stock market"
        ></meta> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;700&family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,500;6..12,700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        ></link>
        <script
          type="text/javascript"
          src="/app/_library/charting_library/charting_library.js"
        ></script>
      </head>
      <GoogleAnalytics />
      <body>
        <Provider store={store}>
          <ThemeRegistry options={{ key: "mui" }}>
            <Header />
            {children}
            <DisableCopyPaste />
            <Footer />
          </ThemeRegistry>
        </Provider>
      </body>
    </html>
  );
}
