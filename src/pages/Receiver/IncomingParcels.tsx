import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useIncomingParcelQuery } from "@/redux/feature/receiver/receiver.api"
import type { IParcelPackage } from "@/types"
import { StatusLog } from "../Sender/StatusLog"
import { Button } from "@/components/ui/button"


export default function IncomingParcels() {
    const {data: incomingParcel} = useIncomingParcelQuery(undefined)
    console.log("incomingParcel", incomingParcel)

    //  const parcels = incomingParcel?.data?.slice()?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    // console.log("parcels", parcels)


  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Incoming Parcels</h1>
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
              incomingParcel?.data?.map((item: IParcelPackage) => (
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
