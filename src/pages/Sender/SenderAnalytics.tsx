import { Card, CardContent,  CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useSenderAnalyticsQuery } from "@/redux/feature/parcel/parcel.api";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function SenderAnalytics() {
  const {data: anylyticData, isLoading} = useSenderAnalyticsQuery(undefined)

  if(isLoading) return <div>Loading...</div>

  const data = anylyticData?.data 

  const monthlyData = data?.monthlyPacelStats?.map((item: {_id: { month: number; year: number}; count: number}) => ({
    month: new Date( item._id.year, item._id.month -1).toLocaleString("default", {month: "short", year: "numeric"}) ,
    total: item.count,
  })) || [];


const chartConfig = {
  count: {
    label: "Parcels",
    color: "var(--color-desktop)",
  },
}
  

  return (
    <div className="sm:w-2/3 md:1/2 text-muted mx-auto px-4 sm:px-6 lg:px-8">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="mt-4 sm:mt-0 shadow p-5 bg-linear-to-r/srgb from-indigo-200 to-teal-300 hover:bg-linear-to-r/srgb hover:from-teal-300 hover:to-indigo-200 rounded-xl duration-500 ease-in-out">
            <h3 className="text-md font-medium text-pretty text-gray-900 flex flex-col items-center">
              <span className="font-bold text-2xl sm:text-4xl">{data?.totalPacelSent}</span>
              <span>Total Pacel Sent</span> 
            </h3>             
          </div>
        <div className="mt-4 sm:mt-0 shadow p-5 bg-linear-to-r/srgb from-indigo-200 to-teal-300 hover:bg-linear-to-r/srgb hover:from-teal-300 hover:to-indigo-200 rounded-xl duration-500 ease-in-out">
            <h3 className="text-md font-medium text-pretty text-gray-900 flex flex-col items-center">
              <span className="font-bold text-2xl sm:text-4xl">{data?.deliveredParcels}</span>
              <span>Delivered Parcels</span> 
            </h3>           
          </div>
        <div className="mt-4 sm:mt-0 shadow p-5 bg-linear-to-r/srgb from-indigo-200 to-teal-300 hover:bg-linear-to-r/srgb hover:from-teal-300 hover:to-indigo-200 rounded-xl duration-500 ease-in-out">
            
            <h3 className="text-md font-medium text-pretty text-gray-900 flex flex-col items-center">
              <span className="font-bold text-2xl sm:text-4xl">{data?.intransitParcels}</span>
              <span>In Iransit Parcels</span> 
            </h3>            
          </div>
        <div className="mt-4 sm:mt-0 shadow p-5 bg-linear-to-r/srgb from-indigo-200 to-teal-300 hover:bg-linear-to-r/srgb hover:from-teal-300 hover:to-indigo-200 rounded-xl duration-500 ease-in-out">
            <h3 className="text-md font-medium text-pretty text-gray-900 flex flex-col items-center">
              <span className="font-bold text-2xl sm:text-4xl">{data?.canceledParcel}</span>
              <span>Canceled Parcel</span> 
            </h3>             
          </div>
          </div>
          <div className="mt-8">
            <Card>
      <CardHeader>
        <CardTitle>May Parcel History</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart  data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="total"  fill="#72ec0d" radius={4} />
            
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Showing total parcels by month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
          </div>
      
    </div>
  )
}
