"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive line chart";

const defaultColors = [
  "#e41a1c",
  "#377eb8",
  "#4daf4a",
  "#ff7f00",
  "#984ea3",
  "#f781bf",
  "#a65628",
  "#ffff33",
];

type DataItem = {
  date: string;
  [user: string]: number | string;
};

export function ChartLineInteractive({ data }: { data: DataItem[] }) {
  const userKeys = React.useMemo(() => {
    if (!data.length) return [];
    return Object.keys(data[0]).filter((k) => k !== "date");
  }, [data]);

  const sortedData = React.useMemo(() => {
    return [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [data]);

  const cumulativeData = React.useMemo(() => {
    const totals: Record<string, number> = {};
    userKeys.forEach((key) => (totals[key] = 0));

    return sortedData.map((item) => {
      const newItem: DataItem = { date: item.date };
      userKeys.forEach((key) => {
        const val = item[key];
        if (typeof val === "number") {
          totals[key] += val;
          newItem[key] = totals[key];
        }
      });
      return newItem;
    });
  }, [sortedData, userKeys]);

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    userKeys.forEach((user, i) => {
      config[user] = {
        label: user.charAt(0).toUpperCase() + user.slice(1),
        color: defaultColors[i % defaultColors.length],
      };
    });
    return config;
  }, [userKeys]);

  const total = React.useMemo(() => {
    const totals: Record<string, number> = {};
    userKeys.forEach((key) => {
      const lastValue = cumulativeData.length
        ? cumulativeData[cumulativeData.length - 1][key]
        : 0;
      totals[key] = typeof lastValue === "number" ? lastValue : 0;
    });
    return totals;
  }, [cumulativeData, userKeys]);

  const [activeChart, setActiveChart] = React.useState<string>(
    userKeys[0] || ""
  );

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-wrap">
          {userKeys.map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-muted-foreground text-xs">
                {chartConfig[key]?.label ?? key}
              </span>
              <span className="text-lg font-bold sm:text-3xl leading-none">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={cumulativeData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            {userKeys.map((key) => (
              <Line
                key={key}
                dataKey={key}
                type="monotone"
                stroke={chartConfig[key]?.color || "black"}
                strokeWidth={2}
                dot={false}
                opacity={activeChart === key ? 1 : 0.3}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
