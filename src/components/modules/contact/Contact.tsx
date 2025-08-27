import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router";


export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    setSent(true)
  }

  if (sent) {
    return (
      <div className="py-12">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-full grid place-items-center border mb-4">
            <Mail className="w-7 h-7"></Mail>
          </div>
          <h1 className="text-2xl font-bold">Thanks! Your inquiry was submitted</h1>
          <p>Our team will get back to you soon. Meanwhile, explore our <Link to="/" className="text-blue-600 hover:underline">Home</Link> </p>
        </div>
      </div>
    )
  }



  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-5">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p>Have a question or went a delivery quote? Fill out the form and we'll reach out.</p>
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl p-5 shadow-sm bg-white">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Your Name</label>
            <input type="text" required name="name" value={form.name} onChange={handleChange} className="px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-sm text-gray-600">Your Email</label>
            <input type="text" required name="email" value={form.email} onChange={handleChange} className="px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Eamil" />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm text-gray-600">Your Phone</label>
            <input  name="phone" value={form.phone} onChange={handleChange} className="px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500" placeholder="01XXXXXXXXX" />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm text-gray-600">Message</label>
            <textarea required rows={5} name="message" value={form.message} onChange={handleChange} className="px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell us about your delivery..." />
          </div>
          <div className="flex items-center justify-between md:col-span-2">
            <p className="text-sm text-gray-600">Simulated submission - no backend required</p>
            <Button disabled={loading} type="submit" className="px-5 py-5 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60">{loading ? "Sending...": "Submit"} </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
