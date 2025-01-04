import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
    views: {
        label: 'Total Transaksi',
    },
    loan: {
        label: 'Peminjaman',
        color: 'hsl(var(--chart-1))'
    },
    return_book: {
        label: 'Pengembalian',
        color: 'hsl(var(--chart-2))'
    }
}

export default function ChartCustome({ chartData })
{
    const [activeChart, setActiveChart] = useState('loan');

    const total = useMemo(
        () => ({
            loan: chartData.reduce((acc, curr) => acc + curr.loan, 0),
            return_book: chartData.reduce((acc, curr) => acc + curr.return_book, 0),
        }),
        [],
    );

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
                <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5">
                    <CardTitle>Grafik Transaksi</CardTitle>
                    <CardDescription>Menampilkan grafik transaksi dalam satu bulan terakhir.</CardDescription>
                </div>
                <div className="flex">
                    {['loan', 'return_book'].map((key) => {
                        return (
                            <button
                                key={key}
                                data-active={activeChart === key}
                                className="flex relative z-30 flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-1
                                data-[active=true]:bg-muted/50 sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(key)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[key].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key].toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            defaultProps="0"
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })
                            }}
                        />

                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="Views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar
                            dataKey={activeChart}
                            fill={`var(--color-${activeChart})`}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}