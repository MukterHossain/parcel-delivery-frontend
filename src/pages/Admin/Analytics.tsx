import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent,  } from "@/components/ui/chart"
import { useAdminAnalyticsQuery } from "@/redux/feature/admin/admin.api"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

type ChartDataItem = {
    month: string;
    [status: string]: string | number;
  };

export default function Analytics() {
  const {data: anylyticsData, isLoading} = useAdminAnalyticsQuery(undefined)

  if(isLoading) return <div>Loading...</div>

  const data = anylyticsData?.data 
  const chartDataRow = data?.parcelsStatusCount?.map((item: {_id: {_id: string; month: number; year: number; status: string}; count: number}) => ({
    month: `${new Date(item._id.year, item._id.month -1).toLocaleString("default", { month: "short" })} ${item._id.year}`,
    status: item._id.status,
    count: item.count,
  })) || [];
  const chartData = chartDataRow.reduce((acc:ChartDataItem[], item:{month: string, status: string, count: number}) =>{
    const existingItem = acc.find(d => d.month === item.month )
    if(existingItem){
      existingItem[item.status] = item.count
    }else{
      acc.push({month: item.month, [item.status] : item.count})
    }
    return acc
  }, [])

  const months = chartData.map((item: {month: string}) => item.month)
  const dateRange = months.length > 0 ? `${months[0]} - ${months[months.length -1]}`: ""

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
              <span className="font-bold text-2xl sm:text-4xl">{data?.totalUsers}</span>
              <span>Total Users</span> 
            </h3>             
          </div>
        <div className="mt-4 sm:mt-0 shadow p-5 bg-linear-to-r/srgb from-indigo-200 to-teal-300 hover:bg-linear-to-r/srgb hover:from-teal-300 hover:to-indigo-200 rounded-xl duration-500 ease-in-out">
            <h3 className="text-md font-medium text-pretty text-gray-900 flex flex-col items-center">
              <span className="font-bold text-2xl sm:text-4xl">{data?.totalSenders}</span>
              <span>Total Senders</span> 
            </h3>           
          </div>
        <div className="mt-4 sm:mt-0 shadow p-5 bg-linear-to-r/srgb from-indigo-200 to-teal-300 hover:bg-linear-to-r/srgb hover:from-teal-300 hover:to-indigo-200 rounded-xl duration-500 ease-in-out">
            
            <h3 className="text-md font-medium text-pretty text-gray-900 flex flex-col items-center">
              <span className="font-bold text-2xl sm:text-4xl">{data?.totalReceivers}</span>
              <span>Total Receivers</span> 
            </h3>            
          </div>
        <div className="mt-4 sm:mt-0 shadow p-5 bg-linear-to-r/srgb from-indigo-200 to-teal-300 hover:bg-linear-to-r/srgb hover:from-teal-300 hover:to-indigo-200 rounded-xl duration-500 ease-in-out">
            <h3 className="text-md font-medium text-pretty text-gray-900 flex flex-col items-center">
              <span className="font-bold text-2xl sm:text-4xl">{data?.totalParcel}</span>
              <span>Total Parcels</span> 
            </h3>             
          </div>
          </div>
          <div className="mt-8">
            <Card>
      <CardHeader>
        <CardTitle>Admin Analytics Chart</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickSize={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="REQUESTED"  stackId={"acc"} fill="#72ec0d" radius={4} />
            <Bar dataKey="APPROVED"  stackId={"acc"} fill="#0f9921" radius={4} />
            <Bar dataKey="DISPATCHED"  stackId={"acc"} fill="#352bec" radius={4} />
            <Bar dataKey="IN_TRANSIT"  stackId={"acc"} fill="#14be47" radius={4} />
            <Bar dataKey="DELIVERED"  stackId={"acc"} fill="#82ca9d" radius={4} />
            <Bar dataKey="CANCELED"  stackId={"acc"} fill="#f35757" radius={4} />
            <Bar dataKey="BLOCKED"  stackId={"acc"} fill="#ff8042" radius={4} />
            <Bar dataKey="UNBLOCKED"  stackId={"acc"} fill="#10db2b" radius={4} />
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
