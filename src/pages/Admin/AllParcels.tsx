import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusLog } from "../Sender/StatusLog";
import { Button } from "@/components/ui/button";
import type { IParcelPackage } from "@/types";
import { useAllParcelsQuery } from "@/redux/feature/admin/admin.api";


export default function AllParcels() {
    const {data: AllParcel} = useAllParcelsQuery(undefined)
    console.log("AllParcel", AllParcel)
    // const parcels = AllParcel?.data?.slice()?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    // console.log("parcels", parcels)
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              AllParcel?.data?.data?.map((item: IParcelPackage) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium ">{item?.type}</TableCell>
                  <TableCell className="font-medium ">{item?.deliveryAddress}</TableCell>
                     <TableCell className="font-medium">{item?.pickupAddress}</TableCell>
                  <TableCell className="font-medium"> {item?.status}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
