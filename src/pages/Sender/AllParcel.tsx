/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCancelParcelMutation, useGetSenderParcelsQuery } from "@/redux/feature/parcel/parcel.api"
import type { IParcelPackage } from "@/types";
import {  X } from "lucide-react";
import { toast } from "sonner";
import { StatusLog } from "./StatusLog";
import { Link } from "react-router";


export default function AllParcel() {

  const {data:senderData , isLoading, error} = useGetSenderParcelsQuery(undefined)
  const [cancelParcel] = useCancelParcelMutation()

  const handleRemoveParcel = async(id:string) => {
    const toastId = toast.loading("Canceling....")
 
    try {
      const res = await cancelParcel({id, status: "CANCELED"}).unwrap()
      if (res.success) {
        toast.success("Removed", { id: toastId })
      }
    } catch (err: any) {
      toast.error( err?.data?.message ||"Something went wrong", { id: toastId })
    }
  }

 

  const statusColors: Record<string, string> = {
    REQUESTED: "text-green-500",
    IN_TRANSIT: "text-green-500",
    DELIVERED: "text-green-500",
    CANCELED: "text-red-500",
    BLOCKED: "text-red-500",
    UNBLOCKED: "text-green-500",
 }
 
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Failed to load parcel tracking</div>

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">All Parcels</h1>
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Delivery Address</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="text-right">Tracking</TableHead>
              <TableHead className="text-right">Status Log</TableHead>
              <TableHead className="text-right">Cancel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              senderData?.data?.map((item: IParcelPackage) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium ">{item?.type}</TableCell>
                  <TableCell className="font-medium ">{item?.deliveryAddress}</TableCell>

                  <TableCell className={statusColors[item?.status] || "text-gray-500"}>{item?.status.toLowerCase()} </TableCell>

                  <TableCell className="font-medium">
                    <Link to={`/sender/parcel-tracking/${item.trackingId}`} className="bg-blue-500 rounded-sm px-2 py-1 text-white hover:bg-blue-200 hover:text-blue-800 duration-300">Tracking</Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    <StatusLog id={item?._id}>
                        <Button size={"sm"}>Staus Log</Button>
                    </StatusLog>
                    
                  </TableCell>
                  <TableCell className="font-medium">
                    <DeleteConfirmation onConfirm={() => handleRemoveParcel(item?._id)}>
                      <Button disabled={item?.status === "DISPATCHED" || item?.status === "DELIVERED" || item?.status === "CANCELED"}  size="sm"> <X />
                      </Button>
                      
                    </DeleteConfirmation>
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
