import Loading from "@/loading/Loading"
import { usePublicParcelTrackingQuery } from "@/redux/feature/parcel/parcel.api"
import { useState } from "react"


export default function PublicParcelTracking() {
    const [trackingId, setTrackingId] = useState('')
    const [searchId, setSearchId] = useState('')

    const {data, isLoading, error} = usePublicParcelTrackingQuery(searchId,{skip: !searchId})

    const handleSearch = () =>{
        setSearchId(trackingId)
    }

    const parcel = data?.data

    if(isLoading) return <Loading></Loading>
    if(error) return <p>Parcel not found</p>

  return (
    <div className="max-w-xl mx-auto p-5">
     <h1 className="text-2xl  inline-block text-green-900 font-bold text-pretty bg-linear-to-r/srgb from-teal-200 to-indigo-200 hover:bg-linear-to-r/srgb hover:from-indigo-200 hover:to-teal-300 py-2 px-4 rounded-lg  ">Track Your Parcel</h1>
      <div className="flex sm:items-center gap-4 mt-8">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
            Search
          </button>
      </div>
        <div className="mt-5 ">
            {
            parcel && (
                <div className="border border-gray-300 rounded-md">
                    <h1 className="text-2xl font-bold mb-4">Pacel Details</h1>
                    <p><strong>ID: </strong>{parcel?.trackingId}</p>
                    <p><strong>Pickup address: </strong>{parcel?.pickupAddress}</p> 
                    <p><strong>Delivery address: </strong>{parcel?.deliveryAddress}</p> 
                    <p><strong>Fee Tk: </strong>{parcel?.fee}</p> <p><strong>Status: </strong> {parcel?.status}</p>
                    <h2 className="text-2xl font-bold mt-5">Status Timeline</h2>
                    <div className="mt-2">
                    {parcel?.statusLogs?.map((log: { status: string; location?: string; note: string; updatedBy: string; timestamp: string }, index: number) => (
                        <div key={index} className="border p-3 mb-2">
                            <p><strong>Status: </strong>{log?.status}</p>
                            <p><strong>Location: </strong>{log?.location}</p>
                            <p><strong>Note: </strong>{log?.note}</p>
                            <p><strong>Updated At: </strong>{new Date(log?.timestamp).toLocaleString()}</p>
                        </div>
                    ))}
                    </div>
                </div>
            )
        }
        </div>
    </div>
  )
}
