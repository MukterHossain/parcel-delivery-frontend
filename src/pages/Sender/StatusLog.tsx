
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Loading from "@/loading/Loading"
import { useStatusLogsQuery } from "@/redux/feature/parcel/parcel.api"
import type { ReactNode } from "react"




interface IProps {
  children: ReactNode,
  id: string
}
export function StatusLog({ children, id }: IProps) {
  const { data: statusData, isLoading } = useStatusLogsQuery(id, { skip: !id })

  if (isLoading) return <Loading></Loading>
  return (
    <Dialog >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Status Logs</DialogTitle>
          {
            isLoading ? (<span>Loading...</span>) :
              statusData?.data?.statusLogs.map((log: { status: string; location?: string; note: string; updatedBy: string; timestamp: string }, index: number) => (
                <div key={index} className="border shadow rounded p-5 ">
                  <p><strong>Status: </strong> {log.status}</p>
                  <p><strong>Location: </strong> {log.location}</p>
                  <p><strong>Note: </strong>{log.note}</p>
                  <p><strong>Updated At:</strong> {new Date(log.timestamp).toLocaleString()}</p>
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
