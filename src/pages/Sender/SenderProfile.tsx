import { useUserInfoQuery } from "@/redux/feature/auth/auth.api"


export default function SenderProfile() {
  const { data: userInfo } = useUserInfoQuery(undefined)
  console.log("userInfo", userInfo)

  return (
    <div>
      <h1>{userInfo?.data?.role} Profile</h1>
      <div className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6">
        <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
          <div className="sm:order-last sm:shrink-0">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
              className="size-16 rounded-full object-cover sm:size-[72px]"
            />
          </div>

          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg font-medium text-pretty text-gray-900">
              {userInfo?.data?.name}
            </h3>
             <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
             {userInfo?.data?.email}
              </p>
          </div>
        </div>

        <dl className="mt-6 flex gap-4 lg:gap-6">
          <div className="flex items-center gap-2">
            <p>Start Date: </p>
            <p>{userInfo?.data?.createdAt.split("T")[0]}</p>

           </div>

          <div className="flex items-center gap-2">
            <p>Role: </p>
            <p>{userInfo?.data?.role}</p>
           </div>
        </dl>
      </div>

    </div>
  )
}
