import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon} from "lucide-react";
import { useForm } from "react-hook-form";


export default function AddParcel() {



    const form = useForm()

    const handleSubmit = (data) =>{
        console.log("data", data)
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
                        <Input type="number" {...field} />
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
                        <Input type="number" {...field} />
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
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem className="flex-1 ">
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} 
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* {Object.values(PARCEL_STATUS).map(
                          (status: { label: string; value: string }) => (
                            <SelectItem key={status} value={status}>
                              {status.label}
                            </SelectItem>
                          )
                        )} */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
                />
              </div>
              
              <div className="flex gap-5">
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
                            selected={new Date(field.value)}
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
            Create Tour
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
