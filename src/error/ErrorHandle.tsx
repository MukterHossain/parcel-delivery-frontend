import { Link } from "react-router";


export default function ErrorHandle() {
  return (
    <div className="h-screen flex flex-col items-center justify-between bg-accent-foreground">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
        <p className="mt-2 text-gray-600">Oops! The page you're looking for doesn't exist.</p>
        <Link to={"/"} className="mt-3 text-blue-500 bg-gray-200 px-4 py-2 rounded">Go Back Home</Link>
    </div>
  )
}
