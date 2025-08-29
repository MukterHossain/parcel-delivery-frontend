
import Loading from "@/loading/Loading";
import { useSenderParcelTrackingQuery } from "@/redux/feature/parcel/parcel.api"
import { useParams } from "react-router"


export default function SenderParcelTracking() {
  const { trackingId } = useParams<{ trackingId: string }>()
  const { data: parcelTracking, isLoading, error } = useSenderParcelTrackingQuery(trackingId!, { skip: !trackingId })



  const trackginData = parcelTracking?.data;

  if (isLoading) return <Loading></Loading>
  if (error) return <div>Failed to load parcel tracking</div>
  return (
    <div className="max-w-7xl mx-auto p-5 text-muted-foreground">
      <h1 className="text-2xl mb-6 inline-block text-green-900 font-bold text-pretty bg-linear-to-r/srgb from-indigo-200 to-teal-300 hover:bg-linear-to-r/srgb hover:from-teal-300 hover:to-indigo-200 py-2 px-4 rounded-lg  ">Sender Parcel Tracking</h1>
      {
        trackginData ? (
          <div className="space-y-5">
            <div className="bg-green-100 hover:bg-gray-50 duration-300 shadow-md rounded-lg p-5">
              <h2 className="text-2xl font-semibold mb-3"><strong>Tracking ID: </strong> {trackginData.trackingId}</h2>
              <p className="text-gray-700"> <strong>Name: </strong>{trackginData?.sender?.name} </p>

              <p className="text-gray-700"> <span className="font-semibold"><strong>Pickup Address: </strong> </span>{trackginData?.pickupAddress} </p>
              <p className="text-gray-700"> <strong>Delivery Address: </strong>{trackginData?.deliveryAddress} </p>
              <p className="text-gray-700"> <strong>Fee Tk: </strong>{trackginData?.fee} </p>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-blue-50 hover:bg-green-50 duration-300 shadow-md rounded-lg p-5">
                <h2 className="text-3xl  mb-3"><strong>Sender</strong></h2>

                <p className=""> <strong>Name: </strong>{trackginData?.sender?.name} </p>
                <p className=""> <strong>Email: </strong>{trackginData?.sender?.email} </p>
              </div>
              <div className="bg-green-50 hover:bg-blue-50 shadow-md rounded-lg p-5">
                <h2 className="text-3xl mb-3"><strong>Receiver</strong></h2>

                <p className=""> <strong>Name: </strong>{trackginData?.receiver?.name} </p>
                <p className=""> <strong>Email: </strong>{trackginData?.receiver?.email} </p>
              </div>

            </div>

            <div className="bg-gray-50 hover:bg-green-50 shadow-md rounded-lg p-5">
              <h2 className="text-3xl  mb-3"><strong>Status Logs</strong></h2>


              <ul className="space-y-2">
                {
                  trackginData?.statusLogs?.map((log: { status: string; location?: string; note: string; updatedBy: string; timestamp: string }, index: number) => (
                    <li key={index} className="">
                      <p className=""> <strong>Status: </strong>{log?.status} </p>
                      {log?.location && <p className=""> <strong>Location: </strong>{log?.location} </p>}
                      {log?.location && <p className=""> <strong>Note: </strong>{log?.note} </p>}
                      <p className=""> <strong>CreateAt: </strong>{new Date(log?.timestamp).toLocaleString()} </p>
                    </li>

                  ))
                }
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <p>No tracking data found.</p>
          </div>
        )
      }
    </div>
  )
}
