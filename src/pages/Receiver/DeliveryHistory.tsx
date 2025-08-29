import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDeliveryHistoryQuery } from "@/redux/feature/receiver/receiver.api"
import { StatusLog } from "../Sender/StatusLog"
import { Button } from "@/components/ui/button"
import type { IParcelPackage } from "@/types"
import Loading from "@/loading/Loading"


export default function DeliveryHistory() {
  const { data: deliveryHistory, isLoading } = useDeliveryHistoryQuery(undefined)
  const parcels = deliveryHistory?.data?.slice()?.sort((a: IParcelPackage, b: IParcelPackage) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  if (isLoading) return <Loading></Loading>
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Delivery History</h1>
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Delivery Address</TableHead>
              <TableHead className="">Pickup Address</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              parcels?.map((item: IParcelPackage) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium ">{item?.type}</TableCell>
                  <TableCell className="font-medium ">{item?.deliveryAddress}</TableCell>
                  <TableCell className="font-medium">{item?.pickupAddress}</TableCell>
                  <TableCell className="font-medium"> {item?.status}</TableCell>
                  <TableCell className="font-medium">
                    <StatusLog id={item?._id}>
                      <Button size={"sm"}>Staus Log</Button>
                    </StatusLog>

                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
