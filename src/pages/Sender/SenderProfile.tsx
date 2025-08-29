import { useUserInfoQuery } from "@/redux/feature/auth/auth.api"
import photo from "@/assets/images/photo.jpg"
import Loading from "@/loading/Loading"

export default function SenderProfile() {
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined)

  if (isLoading) return <Loading></Loading>
  return (
    <div className="mt-10">     
      <div className="max-w-lg mx-auto block  border border-gray-300 sm:p-6 mt-4 sm:mt-0 shadow p-5 bg-linear-to-r/srgb from-indigo-200 to-teal-300 hover:bg-linear-to-r/srgb hover:from-teal-300 hover:to-indigo-200 rounded-xl duration-500 ease-in-out">
      <h1 className="text-2xl  inline-block text-green-900 font-bold text-pretty bg-linear-to-r/srgb from-teal-200 to-indigo-100 hover:bg-linear-to-r/srgb hover:from-indigo-200 hover:to-teal-300 py-2 px-4 rounded-lg  ">Sender Profile</h1>
      
        <div className="flex flex-col sm:gap-4 mt-10 lg:gap-6">
          <div className="flex justify-center  sm:shrink-0">
            <img
              alt="photo"
              src={userInfo?.data?.picture ? userInfo?.data?.picture : photo}
              className="size-[80px] rounded-full object-cover sm:size-[90px] shadow md:size-[120px]"
            />
          </div>

          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg font-medium text-pretty text-gray-900 text-center ">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">{userInfo?.data?.name.toUpperCase()}</span>
            </h3>
            <p className="mt-4 text-sm flex flex-col sm:flex-row sm:items-center gap-1 text-pretty text-gray-700"> <strong></strong>
              <span>Email:</span> <span className="font-bold text-sm sm:text-[16px] md:text-lg">{userInfo?.data?.email}</span>

            </p>
            <div className="flex text-gray-700 flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
              <div className="">
                <h1 className="flex text-sm items-center gap-2">
                  <span>Open Date: </span>
                  <span className="text-[15px] font-semibold">{userInfo?.data?.createdAt.split("T")[0]}</span>

                </h1>
                <h1 className="flex text-sm items-center gap-2">
                  <span>Last Update: </span>
                  <span className="text-[15px] font-semibold">{userInfo?.data?.updatedAt.split("T")[0]}</span>

                </h1>
              </div>

              <h1 className="flex items-center justify-end gap-2">
                <span>Role: </span>
                <span className="font-bold text-lg sm:text-[16px] md:text-lg">{userInfo?.data?.role.toUpperCase()}</span>
              </h1>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
