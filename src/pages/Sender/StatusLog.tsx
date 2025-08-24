
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useStatusLogsQuery } from "@/redux/feature/parcel/parcel.api"
import type { ReactNode } from "react"




interface IProps {
    children: ReactNode,
    id:string
}
export function StatusLog({children, id}:IProps) {
  const {data:statusData, isLoading} = useStatusLogsQuery(id, {skip: !id})
console.log("statusData", statusData)
  return (
    <Dialog >
  <DialogTrigger  asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Status Logs</DialogTitle>
      {
          isLoading ? (<span>Loading...</span>): 
          statusData?.data?.statusLogs.map((log:{status:string; location?:string; note:string; updatedBy:string; timestamp:string}, index:number) =>(
            <div key={index}>
              <p>Status: {log.status}</p>
              <p>Location: {log.location}</p>
              <p>Note: {log.note}</p>
              <p>Updated At: {new Date(log.timestamp).toLocaleString()}</p>
            </div>
          ))
        }
      <DialogDescription className="sr-only">
        this is the description
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}
