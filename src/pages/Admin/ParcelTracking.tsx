import { useParcelTrackingQuery } from "@/redux/feature/admin/admin.api"
import { useParams } from "react-router"


export default function ParcelTracking() {
    const {trackingId} = useParams<{trackingId: string}>()
    const {data: parcelTracking, isLoading, error} = useParcelTrackingQuery(trackingId!, {skip: !trackingId})


    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Failed to load parcel tracking</div>

    const trackginData = parcelTracking?.data;
  return (
    <div className="max-w-7xl mx-auto p-5 text-muted-foreground">
      {
        trackginData ? (
          <div className="space-y-5">
            <div className="bg-green-200 hover:bg-gray-50 duration-300 shadow-md rounded-lg p-5">
                <h2 className="text-2xl font-semibold mb-3">Tracking ID: {trackginData.trackingId}</h2>
            <p className="text-gray-700"> <span className="font-semibold">Name: </span>{trackginData?.sender?.name} </p>
            
            <p className="text-gray-700"> <span className="font-semibold">Pickup Address: </span>{trackginData?.pickupAddress} </p>
            <p className="text-gray-700"> <span className="font-semibold">Delivery Address: </span>{trackginData?.deliveryAddress} </p>
            <p className="text-gray-700"> <span className="font-semibold">Fee Tk: </span>{trackginData?.fee ? trackginData?.fee : "00"} </p>
           
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div className="bg-blue-50 hover:bg-green-50 duration-300 shadow-md rounded-lg p-5">
                 <h2 className="text-2xl font-semibold mb-3">Sender</h2>
            
            <p className=""> <span className="font-semibold">Name: </span>{trackginData?.sender?.name} </p>
            <p className=""> <span className="font-semibold">Email: </span>{trackginData?.sender?.email} </p>
               </div>
               <div className="bg-green-50 hover:bg-blue-50 shadow-md rounded-lg p-5">
                 <h2 className="text-2xl font-semibold mb-3">Receiver</h2>
            
            <p className=""> <span className="font-semibold">Name: </span>{trackginData?.receiver?.name} </p>
            <p className=""> <span className="font-semibold">Email: </span>{trackginData?.receiver?.email} </p>
               </div>
           
            </div>

             <div className="bg-gray-50 hover:bg-green-50 shadow-md rounded-lg p-5">
                 <h2 className="text-2xl font-semibold mb-3">Status Logs</h2>
            
            
            <ul className="space-y-2">
              {
                trackginData?.statusLogs?.map((log:{status:string; location?:string; note:string; updatedBy:string; timestamp:string}, index:number) =>(
                  <li key={index} className="">
                    <p className=""> <span className="font-semibold text-gray-600">Status: </span>{log?.status} </p>
                    {log?.location && <p className=""> <span className="font-semibold text-gray-600">Location: </span>{log?.location} </p>}
                    {log?.location && <p className=""> <span className="font-semibold text-gray-600">Note: </span>{log?.note} </p>}
                    <p className=""> <span className="font-semibold text-gray-600">CreateAt: </span>{new Date(log?.timestamp).toLocaleString()} </p>
                  </li>
                  
                ))
              }
            </ul>
               </div>
            </div>
        ): (
          <div>
            <p>No tracking data found.</p>
          </div>
        )
      }
    </div>
  )
}
