import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    id: "1",
    title: "How long does delivery usually take?",
    content:
      "Delivery time depends on the destination:",
      time: [
        {
          title: "Same city",
          time: "Within 24 hours"
        },
        {
          title: "Inter city",
          time: "1-3  business days"
        },
        {
          title: "Remote areas ",
          time: "3-6 business days"
        }
      ]
  },
  {
    id: "2",
    title: "Can I track my parcel in real-time?",
    content:
      "Yes! Every parcel comes with a unique tracking ID. You can track your shipment status live through our tracking page or mobile app.",
  },
  {
    id: "3",
    title: "What items are prohibited for delivery?",
    content:
      "We do not allow delivery of illegal items, explosives, hazardous materials, perishable goods (without prior agreement), or items restricted by government regulations.",
  },
  {
    id: "4",
    title: "Do you offer insurance for valuable parcels?",
    content:
      "Yes! we provide optional insurance coverage for high-value parcels. You can choose this during booking for extra security.",
  },
  {
    id: "5",
    title: "What should I do if my parcel is delayed or lost?",
    content:
      "If your parcel is delayed or lost, contact our customer support team with your tracking ID. We will investigate immediately and either delivery or compensate according to our policy.",
  },
]

export default function Faq() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-2">
              {item.content}
              <div className="mt-2 ">
                {item.time?.map((time, index) => (
                  <div key={index} className="mb-2 flex items-center gap-1">
                    <h3 className="text-sm font-bold">{time.title}</h3>:
                    <p className="text-sm">{time.time}</p>
                  </div>
                ))}
              </div>
              
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
