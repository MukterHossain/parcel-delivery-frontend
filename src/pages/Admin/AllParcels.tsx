import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IParcelPackage } from "@/types";
import { useAllParcelsQuery } from "@/redux/feature/admin/admin.api";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";


export default function AllParcels() {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")



  const { data: AllParcel, isLoading} = useAllParcelsQuery({ page: currentPage, limit, status, searchTerm, sort: sortOrder === "asc" ? "createdAt": "-createdAt" })
  
  // console.log("AllParcel", AllParcel)

  // console.log("currentPage", currentPage)
  // console.log("limit", limit)

  const parcels = AllParcel?.data?.data || []
  const total = AllParcel?.data?.meta?.total || 0
  const totalPage = Math.ceil(total / limit)
  // console.log("parcels", parcels)
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Delivery History</h1>
        <div>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="REQUESTED">REQUESTED</option>
            <option value="IN_TRANSIT">IN_TRANSIT</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELED">CANCELED</option>
            <option value="BLOCKED">BLOCKED</option>
            <option value="UNBLOCKED">UNBLOCKED</option>
          </select>
        </div>
      <div>
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>
      </div>
      <div className="border border-muted rounded-md">
        {
          parcels?.length> 0 ? (
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
                  parcels?.map((item: IParcelPackage) => (
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
          ) : (
            <Button size="sm" className="w-full border-0 outline-0 bg-gray-50 text-black" disabled={isLoading}>
              <Loader2Icon className="animate-spin" />
              Please wait for comming parcels data ....
            </Button>
          )
        }
      </div>
      {
        totalPage > 1 && (
          <div className="flex justify-end mt-4">
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
