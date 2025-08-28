/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import { useAddParcelMutation, useAllReceiversQuery} from "@/redux/feature/parcel/parcel.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon} from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";



const parceSchema = z.object({
    type: z.string().min(3, { message: "Parcel type is too short" }).max(50),
    weight: z.number().min(0, { message: "Weight is required and should be greater than 0" }).max(50),
    fee: z.number().min(0, { message: "Fee is required and should be greater than 0" }),
    pickupAddress: z.string().min(3, { message: "Pickup Address is required" }).max(100),
    deliveryAddress: z.string().min(3, { message: "Delivery Address is required" }).max(100),
    deliveryDate: z.date().optional(),
    description: z.string().optional(),
    receiverId: z.string().min(3, { message: "Receiver is required" }).max(100),
    status: z.enum(["REQUESTED", "APPROVED", "DISPATCHED", "IN_TRANSIT","DELIVERED", "CANCELED","BLOCKED", "UNBLOCKED"]),

})
type ParcelFormValues = z.infer<typeof parceSchema>

export default function AddParcel() {
const {data: getSender} = useUserInfoQuery(undefined)
   const [addParcel] = useAddParcelMutation()
  const { data: receivers } = useAllReceiversQuery(undefined)
const navigate = useNavigate()

  const receiversOptions = receivers?.data?.map((receiver: { _id: string; name: string }) => ({
    value: receiver._id,
    label: receiver.name
  })
  )
  const senderId = getSender?.data?._id;

    const form = useForm<ParcelFormValues>({
        resolver: zodResolver(parceSchema),
        defaultValues: {
            type: "",
            weight: 0,
            fee: 0,            
            pickupAddress: "",
            deliveryAddress: "",
            deliveryDate: undefined,
            description: "",
            receiverId: "",
            status: "REQUESTED",
        }
    })

    const handleSubmit = async(values: ParcelFormValues) =>{
      const toastId = toast.loading("Creating parcel....");
      try {
        const parcelData = {
          ...values,
          sender: senderId,
          receiver: values.receiverId,
          deliveryDate: values.deliveryDate ? new Date(values.deliveryDate).toISOString() : undefined
        }
  
  await addParcel(parcelData).unwrap()

        toast.success("Parcel created successfully", {id: toastId})
        form.reset();
        navigate("/sender/all-parcels")
      } catch (err: any) {

        toast.error( err?.data?.message ||"Failed to create parcel", {id: toastId})
      }
        
    }

  return (
    <div className="w-full max-w-4xl mx-auto px-5 mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Add New Parcel</CardTitle>
          <CardDescription>Add a new parcel to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="add-parcel"
              className="space-y-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Weight(kg)</FormLabel>
                      <FormControl>
                        <Input type="number"  value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value))}  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Fee</FormLabel>
                      <FormControl>
                        <Input type="number" value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value))}  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Pickup Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex gap-5">
                
                 <FormField
                  control={form.control}
                  name="receiverId" render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Receiver</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {receiversOptions?.map(
                            (option: { value: string; label: string }) => (
                              <SelectItem key={option.value} value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Delivery Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={(field.value ? new Date(field.value): undefined)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
              </div> 
              <div className="flex gap-5 items-stretch">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="h-[205px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" form="add-parcel">
            Create Parcel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
