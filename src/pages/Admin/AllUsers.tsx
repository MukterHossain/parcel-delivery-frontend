/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Loading from "@/loading/Loading"
import { useAllUsersQuery, useUserBlockMutation, useUserUnblockMutation } from "@/redux/feature/admin/admin.api"
import type { IUser } from "@/types"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"


export default function AllUsers() {
  const { data: allUsers, isLoading } = useAllUsersQuery(undefined)
  const [userBlock] = useUserBlockMutation()
  const [userUnblock] = useUserUnblockMutation()


  const Users = allUsers?.data || []

  const handleBlock = async (id: string) => {
    const toastId = toast.loading("User blocking....")

    try {
      const res = await userBlock({ id, isActive: "BLOCKED" }).unwrap()
      if (res.success) {
        toast.success("User blocked", { id: toastId })
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong", { id: toastId })
    }
  }
  const handleUnblock = async (id: string) => {
    const toastId = toast.loading("User unblocking....")

    try {
      const res = await userUnblock({ id, isActive: "UNBLOCKED" }).unwrap()

      if (res.success) {
        toast.success("User unblocked", { id: toastId })
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong", { id: toastId })
    }

  }



  const roleColors: Record<string, string> = {
    ADMIN: "text-pink-500",
    SENDER: "text-green-500",
    RECEIVER: "text-blue-500"
  }

  if (isLoading) return <Loading></Loading>
  return (
    <div>
      <h1>All Users</h1>
      <div className="border border-muted rounded-md">
        {
          Users?.length > 0 ? (
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
                      <TableCell className="font-medium ">{item?.name.toUpperCase()}</TableCell>
                      <TableCell className="font-medium ">{item?.email}</TableCell>
                      <TableCell className={`font-medium ${roleColors[item?.role] || "text-gray-500"}`}>{item?.role.charAt(0).toUpperCase() + item?.role.slice(1).toLowerCase()}</TableCell>
                      <TableCell className={`font-medium ${item?.isActive === "ACTIVE" ? "text-green-500" : "text-red-500"}`}> {item?.isActive.charAt(0).toUpperCase() + item?.isActive.slice(1).toLowerCase()}</TableCell>
                      <TableCell className="font-medium">
                        {
                          item?.isActive === "ACTIVE" ? <Button onClick={() => handleBlock(item._id)}>Block</Button> : <Button onClick={() => handleUnblock(item._id)}>Unblock</Button>
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
