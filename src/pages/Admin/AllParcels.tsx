/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IParcelPackage } from "@/types";
import { useAllParcelsQuery, useStatusUpdateMutation } from "@/redux/feature/admin/admin.api";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";
import { Link } from "react-router";
import Loading from "@/loading/Loading";


export default function AllParcels() {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit,] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const [statusUpdate] = useStatusUpdateMutation()

  const { data: AllParcel, isLoading } = useAllParcelsQuery({ page: currentPage, limit, status, searchTerm, sort: sortOrder === "asc" ? "createdAt" : "-createdAt" })

  const handleStatusChange = async (id: string, newStatus: string) => {

    const toastId = toast.loading("Parcel Updating....")

    try {
      const res = await statusUpdate({ id, status: newStatus }).unwrap()

      if (res.success) {
        toast.success("Parcel status updated", { id: toastId })
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Choose right status. Choose sequently", { id: toastId })
    }
  }

  const parcels = AllParcel?.data?.data || []
  const total = AllParcel?.data?.meta?.total || 0
  const totalPage = Math.ceil(total / limit)

  const transitionStatus: Record<string, string[]> = {
    REQUESTED: ["APPROVED", "CANCELED", "BLOCKED", "UNBLOCKED"],
    APPROVED: ["DISPATCHED"],
    DISPATCHED: ["IN_TRANSIT"],
    IN_TRANSIT: [],
    DELIVERED: [],
    CANCELED: [],
    BLOCKED: ["UNBLOCKED"],
    UNBLOCKED: ["BLOCKED", "APPROVED"],
  }

  const statusColors: Record<string, string>
    = {
    REQUESTED: "text-blue-500 hover:bg-blue-300 duration-300 rounded-sm px-2 py-1 bg-gray-200 hover:text-blue-800",
    APPROVED: "text-green-500 hover:bg-blue-300 duration-300 rounded-sm px-2 py-1 bg-gray-200 hover:text-green-800",
    DISPATCHED: "text-cyan-500 hover:bg-blue-300 duration-300 rounded-sm px-2 py-1 bg-gray-200 hover:text-cyan-800",
    IN_TRANSIT: "text-lime-500 hover:bg-blue-300 duration-300 rounded-sm px-2 py-1 bg-gray-300 hover:text-lime-800",
    DELIVERED: "text-green-500 hover:bg-blue-300 duration-300 rounded-sm px-2 py-1 bg-gray-200 hover:text-green-800",
    CANCELED: "text-red-500 hover:bg-blue-300 duration-300 rounded-sm px-2 py-1 bg-gray-200 hover:text-red-800",
    BLOCKED: "text-shadow-amber-500 hover:bg-blue-300 duration-300 rounded-sm px-2 py-1 bg-gray-200 hover:text-shadow-amber-800",
    UNBLOCKED: "text-green-500 hover:bg-blue-300 duration-300 rounded-sm px-2 py-1 bg-gray-200 hover:text-green-800",
  }


  if (isLoading) return <Loading></Loading>
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <h1 className="text-2xl  inline-block text-green-900 font-bold text-pretty bg-linear-to-r/srgb from-teal-200 to-indigo-100 hover:bg-linear-to-r/srgb hover:from-indigo-200 hover:to-teal-300 py-2 px-4 rounded-lg  ">All Parcels</h1>
      <div className="flex flex-col sm:flex-row my-8 items-center gap-8">

        <div className="border w-full border-accent-foreground sm:w-1/2 rounded-sm   py-1">
          <input className="w-full px-2 outline-none" type="text" placeholder="Search by Type, trackId, delevery or pickup address ...." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="w-full sm:w-1/2 flex items-center gap-5">
          <div className="border w-full border-accent-foreground  rounded-sm   py-1">
            <select className="w-full px-2 text-muted-foreground bg-muted outline-none" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All</option>
              <option value="REQUESTED">REQUESTED</option>
              <option value="IN_TRANSIT">IN_TRANSIT</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELED">CANCELED</option>
              <option value="BLOCKED">BLOCKED</option>
              <option value="UNBLOCKED">UNBLOCKED</option>
            </select>
          </div>
          <div className="border border-accent-foreground  rounded-sm px-2  py-1">
            <button className={`${sortOrder === "asc" ? "text-green-500" : "text-blue-500"}`} onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              {sortOrder === "asc" ? "Descending" : "Ascending"}
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Type</TableHead>
              <TableHead className="">Delivery Address</TableHead>
              <TableHead className="">Pickup Address</TableHead>
              <TableHead className="">TrackingId</TableHead>
              <TableHead className="">Tracking</TableHead>
              <TableHead className="">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              parcels?.map((item: IParcelPackage) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium ">{item?.type}</TableCell>
                  <TableCell className="font-medium ">{item?.deliveryAddress}</TableCell>
                  <TableCell className="font-medium">{item?.pickupAddress}</TableCell>
                  <TableCell className="font-medium">{item?.trackingId}</TableCell>
                  <TableCell className="font-medium ">
                    <Link to={`/admin/parcel-tracking/${item.trackingId}`} className="bg-blue-500 rounded-sm px-2 py-1 text-white hover:bg-blue-200 hover:text-blue-800 duration-300">Tracking</Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    <select className={`${statusColors[item?.status] || "text-gray-500"}`} defaultValue={item?.status} onChange={(e) => handleStatusChange(item._id, e.target.value)}>
                      <option value={item?.status}>{item?.status.toLowerCase()}</option>
                      {transitionStatus[item?.status]?.map(status => (
                        <option key={status} value={status}>{status.toLowerCase()}</option>
                      ))}
                    </select>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

      </div>
      {
        totalPage > 1 && (
          <div className="flex justify-center mt-4">
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setCurrentPage((prev) => prev - 1)} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>

                  {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                    (page) => (
                      <PaginationItem
                        key={page}
                        onClick={() => setCurrentPage(page)}
                      >
                        <PaginationLink isActive={currentPage === page}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext onClick={() => setCurrentPage((prev) => prev + 1)} className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )
      }
    </div>
  )
}
