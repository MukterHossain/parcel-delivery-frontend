import Logo from "@/assets/logo/Logo.png"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function HeroSection() {
  return (
    <div>
      <section className="relative overflow-hidden py-24 ">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <img src={Logo} className="h-12 w-14 inline-block" alt="" />
            </div>
            <div>
              <h1 className="mb-6 text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Deliver anyting, <span className="text-blue-600">anywhere</span> fast & secure
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
               A reliable parcel delivery service inspired by Pathao Courier & Sundarban -- built for speed, safety, and clarity.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
                
              <Link to="/contact"><Button className="bg-blue-500 hover:bg-blue-700 px-4 py-3 duration-300">Book a Pickup</Button></Link>
              <Link to="/feature"><Button className="bg-blue-700 hover:bg-blue-500 px-4 py-3 duration-30">Features</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
