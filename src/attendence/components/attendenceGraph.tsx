import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Present",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Absent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function AttendanceChart({ id }: { id: string }) {
  const user = useSelector((state: RootState) => state.user.users).filter((user) => user.id === id)
  const Other = useSelector((state: RootState) => state.user.users).filter((user) => user.id !== id)
  const OtherPresent = Other.map((e) => e.attendenceList.present)
    .reduce((total, present) => total + present, 0) / Other.length
  const OtherAbsent = Other.map((e) => e.attendenceList.absent)
    .reduce((total, absent) => total + absent, 0) / Other.length
  const userPresent = user[0].attendenceList.present
  const userAbsent = user[0].attendenceList.absent
  const chartData = [
    { month: "Other", desktop: OtherPresent, mobile: OtherAbsent },
    { month: "You", desktop: userPresent, mobile: userAbsent },
  ]
  
  return (
    <Card className="h-full w-full bg-gray-50">
      <CardHeader>
        <CardTitle>Attendance Comparison</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="h-full w-full">
        <ChartContainer config={chartConfig} className="h-[280px] w-[200px] pl-5">
          <BarChart
            height={200}
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
