import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useParams } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "Total leaves",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "Taken Leaves",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "National Holidays",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "Used National Holiday",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "Remaining Leaves",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function Leavedata() {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) =>
    state.user.users.find((user) => user.id === id)
  );
  const Leavesinfo = user?.employeeLeave

  const desktopData = React.useMemo(() => {
    return [
      { month: "january", desktop: Leavesinfo?.totalLeaves, fill: "var(--color-january)" },
      { month: "february", desktop: Leavesinfo?.takenLeaves, fill: "var(--color-february)" },
      { month: "march", desktop: Leavesinfo?.nationalHolidays, fill: "var(--color-march)" },
      { month: "april", desktop: Leavesinfo?.usedNationalHolidays, fill: "var(--color-april)" },
      { month: "may", desktop: Leavesinfo?.remainingLeaves, fill: "var(--color-may)" },
    ];
  }, [Leavesinfo?.totalLeaves, Leavesinfo?.takenLeaves, Leavesinfo?.nationalHolidays, Leavesinfo?.usedNationalHolidays, Leavesinfo?.remainingLeaves]);

  const id1 = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month);

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth, desktopData]
  );
  const months = React.useMemo(() => desktopData.map((item) => item.month), [desktopData]);

  return (
    <Card data-chart={id1} className="flex flex-col">
      <ChartStyle id={id1} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Leaves and Holidays</CardTitle>
          <CardDescription>Leaves </CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id1}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Leaves
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}