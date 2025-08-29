import LoginForm from "@/components/modules/authentication/LoginForm";
import { Link } from "react-router";
import Logo from "@/assets/logo/Logo.png"
import login from "@/assets/images/login.png"


export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className=" flex justify-center gap-2 ">
            <Link to="/" className="flex items-center gap-2">
            <img src={Logo} className="h-12 w-14 inline-block" alt="" />
            </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={login}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
    </div>
  )
}
