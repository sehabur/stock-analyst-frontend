import type { MetadataRoute } from "next";
import { dse30Stocks, sectorList } from "./_data/dse";

const sectors = sectorList.map((item: any) => item.tag);

const index = ["00DSEX", "00DSES", "00DS30"];

export default function sitemap(): MetadataRoute.Sitemap {
  const stocksMap: any = dse30Stocks.map((item: any) => ({
    url: `https://stocksupporter.com/stock-details/${item}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const sectorsMap: any = sectors.map((item: any) => ({
    url: `https://stocksupporter.com/sector/chart/${item}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const indexMap: any = index.map((item: any) => ({
    url: `https://stocksupporter.com/index-details/${item}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: "https://stocksupporter.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://stocksupporter.com/latest-price",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://stocksupporter.com/screener",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://stocksupporter.com/beta",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://stocksupporter.com/block-tr",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://stocksupporter.com/index-mover",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://stocksupporter.com/ipo",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://stocksupporter.com/latest-news",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://stocksupporter.com/supercharts",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...indexMap,
    ...stocksMap,
    ...sectorsMap,
  ];
}
