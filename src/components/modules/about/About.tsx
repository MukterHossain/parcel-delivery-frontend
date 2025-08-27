import { Package } from "lucide-react"


export default function About() {

  const team = [
    {name: "Nadir Ahmed", role: "Operations Lead"},
    {name: "Naimul", role: "Fleet Manager"},
    {name: "Sadia Hasan", role: "Customer Support"},
    {name: "Mamun Haider", role: "Customer Support"},
  ]
  return (
    <div className="py-13">
        <div className="max-w-6xl text-muted-foreground mx-auto px-4">
          <h1 className="text-2xl font-bold">About Us</h1>
          <p>We are on a mission to make parcel delivery in Bangladesh simpler, faster, and more transparent. Our service combines reliable logistics with delightful user experience - from booking to doorstep.</p>
          <div className="mt-10 grid md:grid-cols-3  gap-5">
            {team.map((t, i) =>(
              <div key={i} className="rounded-2xl border p-5 shadow-sm bg-white">
                <div className="w-12 h-12 rounded-full grid place-items-center boreder mb-3">
                  <Package className="w-6 h-6"></Package>
                </div>
                <p className="font-semibold">{t.name}</p> <p className="text-gray-600">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}
