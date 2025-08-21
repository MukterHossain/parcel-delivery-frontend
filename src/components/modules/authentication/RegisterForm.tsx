import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Password from "@/components/ui/Passwor";
import { useRegisterMutation } from "@/redux/feature/auth/auth.api";
import { toast } from "sonner";


const registerSchema = z.object({
  name: z.string().min(3, {error: "Name is too short"}).max(50),
  email: z.email(),
  password: z.string().min(8, {error: "Password is too short"}),
  confirmPassword: z.string().min(8, {error: "Confirm Password is too short"})

}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ['confirmPassword']
})

export default function RegisterForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
const [register] = useRegisterMutation()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async(data: z.infer<typeof registerSchema>) => {

    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "SENDER",
      auths: [{
        provider: "credential",
        providerId: data.email
      }]
    }
    console.log(userInfo)
    try {
      const res = await register(userInfo).unwrap()
      console.log(res)
      toast.success("User Created Successfully")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jhone Doe" type="text" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="jhone@gmail.com" type="email" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Password {...field}></Password>
                                    </FormControl>
                                    <FormDescription className="sr-only">This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                        <FormField
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Password {...field}></Password>
                                    </FormControl>
                                    <FormDescription className="sr-only">This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" className="w-full">
                   
                    Login with GitHub
                </Button>
            </div>
            <div className="text-center  text-sm">
                Have already an account? Please
                <Link to="/login" className="underline underline-offset-4 ml-1">
                    Login
                </Link>
            </div>
        </div>
  )
}
