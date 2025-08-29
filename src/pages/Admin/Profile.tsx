import { useUserInfoQuery } from "@/redux/feature/auth/auth.api"

import photo from "@/assets/images/photo.jpg"
import Loading from "@/loading/Loading"



export default function Profile() {
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined)

  if (isLoading) return <Loading></Loading>
  return (
    <div>
      <div className="max-w-lg mx-auto block text-gray-800  border border-gray-300 sm:p-6 mt-4 sm:mt-0 shadow p-5 bg-linear-to-r/srgb from-indigo-200 to-teal-300 hover:bg-linear-to-r/srgb hover:from-teal-300 hover:to-indigo-200 rounded-xl duration-800 ease-in-out">
      <h1 className="text-2xl  inline-block text-green-900 font-bold text-pretty bg-linear-to-r/srgb from-teal-200 to-indigo-100 hover:bg-linear-to-r/srgb hover:from-indigo-200 hover:to-teal-300 py-2 px-4 rounded-lg  ">Admin Profile</h1>
        <div className="flex flex-col mt-8 sm:gap-4 lg:gap-6">
          <div className="flex justify-center  sm:shrink-0">
            <img
              alt="photo"
              src={userInfo?.data?.picture ? userInfo?.data?.picture : photo}
              className="size-[80px] rounded-full object-cover sm:size-[90px] shadow md:size-[120px]"
            />
          </div>

          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg sm:text-2xl font-bold text-pretty text-gray-900 text-center ">
              <span className="text-xl md:text-2xl font-bold">{userInfo?.data?.name.toUpperCase()}</span>
            </h3>
            <p className="mt-4 flex-wrap text-sm flex flex-row items-center gap-1 text-pretty text-gray-700">
              <span>Email:</span> <span className="font-bold text-sm sm:text-[16px] md:text-lg">{userInfo?.data?.email}</span>

            </p>
            <div className="flex  flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
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
                <span className="font-bold text-lg sm:text-[16px] md:text-lg text-blue-800">{userInfo?.data?.role.toUpperCase()}</span>
              </h1>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
