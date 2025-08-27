import { PhoneCall, ShieldCheck, Truck } from "lucide-react"


export default function Feature() {

  const items = [
    {
      title: "Fast Pickup & Drop",
      icon: <Truck size={24}></Truck>,
      description: "Door-to-door service with clear ETAs and live status updates."
    },
    {
      title: "Secure Handling",
      icon: <ShieldCheck size={24}></ShieldCheck>,
      description: "Tamper-evident packaging and optional insurance for peace of mind."
    },
    {
      title: "Support that cares",
      icon: <PhoneCall  size={24}></PhoneCall>,
      description: "Dedicated hlpline & chat for quick resolution and guidance."
    },
  ] 
  return (
    <div className="py-13 bg-gray-50 p-5">
      <h1 className="text-2xl md:text-3xl text-muted-foreground font-bold">Why choose us?</h1>
      <div className="grid grid-cols-1 text-muted-foreground md:grid-cols-3 gap-4 mt-5">
      {items?.map((item, index) => (
        <div key={index} className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center gap-3"> 
          <div className="w-10 h-10 rounded-xl border grid place-items-center mb-3">{item.icon}</div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        </div>

      ))}
      </div>
    </div>
  )
}
