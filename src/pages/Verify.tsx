/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/feature/auth/auth.api"

import { zodResolver } from "@hookform/resolvers/zod"
import { Dot } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router"
import { toast } from "sonner"
import z from "zod"


const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function Verify() {
  const location = useLocation()
  const [email] = useState(location.state)
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = useState(false)
  const [sendOtp] = useSendOtpMutation()
  const[verifyOtp] = useVerifyOtpMutation()
  const [timer, setTimer] = useState(120)

const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    }})

    const handleSendOtp =async() =>{
      const toastId = toast.loading("Sending OTP...")
      
      try {
        const res = await sendOtp({email: email}).unwrap()
        if(res.success){
          toast.success("OTP sent successfully", {id: toastId})
        }
        setConfirmed(true)
      setTimer(120)
      } catch (err:any) {
        toast.error( err?.data?.message ||"Something went wrong", {id: toastId})
      }
      
    }
  const onSubmit = async (data:z.infer<typeof FormSchema> ) =>{
     const toastId = toast.loading("Verify OTP...")
    const userInfo = {
      email,
      otp: data.pin
    }
    try {
      const res = await verifyOtp(userInfo).unwrap()
      if(res.success){
        toast.success("OTP veryfied successfully", {id: toastId})
        setConfirmed(true)
        navigate("/login")
      }
    } catch (err :any) {
      toast.error( err?.data?.message ||"Something went wrong", {id: toastId})
    }

  }

  useEffect(() => {
    if(!email || !confirmed){
      return
    }
    const timerId = setInterval(() =>{
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timerId)
  }, [email, confirmed])
  
  return (
    <div className="grid place-content-center h-screen">
      {
        confirmed ? (<Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify your email address</CardTitle>
        <CardDescription>
          Please enter the 6-digit code we sent to <br/> {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
      <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <Dot></Dot>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              <Button onClick={handleSendOtp} disabled={timer !==0} className={cn("p-0 m-0", {"cursor-pointer": timer === 0, "text-gray-500": timer !==0})} type="button" variant="link">Reset OTP: </Button>
              {timer}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="otp-form" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>)
    : 
    (<Card className="">
      <CardHeader>
        <CardTitle className="text-xl">Verify your email address</CardTitle>
        <CardDescription>
          We will send you an OTP at <br /> {email}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSendOtp}  type="submit" className="w-[200px] sm:w-[300px]">
          Confirm
        </Button>
      </CardFooter>
    </Card>)
      }
    </div>
  )
}
