import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAllUsersQuery } from "@/redux/feature/admin/admin.api"
import type { IUser } from "@/types"
import { Loader2Icon } from "lucide-react"


export default function AllUsers() {
    const {data: allUsers, isLoading} = useAllUsersQuery(undefined)
    console.log("allUsers", allUsers) 

    const Users = allUsers?.data || []
    console.log("Users", Users)

    if(isLoading) return <h1>Loading...</h1>
      return (
    <div>
      <h1>All Users</h1>
      <div className="border border-muted rounded-md">
        {
          Users?.length> 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Name</TableHead>
                  <TableHead className="">Email</TableHead>
                  <TableHead className="">Role</TableHead>
                  <TableHead className="">isActive</TableHead>
                  <TableHead className="">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  Users?.map((item: IUser) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium ">{item?.name}</TableCell>
                      <TableCell className="font-medium ">{item?.email}</TableCell>
                      <TableCell className="font-medium">{item?.role}</TableCell>
                      <TableCell className="font-medium"> {item?.isActive}</TableCell>
                      <TableCell className="font-medium"> 
                        {
                            item?.isActive === "ACTIVE" ? <Button>Block</Button>: <Button>Unblock</Button>
                        }
                      </TableCell>
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
    </div>
  )
}
